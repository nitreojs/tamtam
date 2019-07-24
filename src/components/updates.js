let middlewareIo = require('middleware-io');
let debug = require('debug')('tamtam:updates');

let TamTamError = require('./tterror');
let Contexts = require('../contexts');

let contexts = {
  message_callback: Contexts.MessageCallbackContext,
  message_created: Contexts.MessageCreatedContext,
  message_edited: Contexts.MessageEditedContext,
  message_removed: Contexts.MessageRemovedContext,
  user_added: Contexts.UserAddedContext,
  user_removed: Contexts.UserRemovedContext,
  bot_started: Contexts.BotStartedContext,
  bot_added: Contexts.BotAddedContext,
  bot_removed: Contexts.BotRemovedContext,
  chat_title_changed: Contexts.ChatTitleChanged,
};

let splitPath = (path) => (
	path.replace(/\[([^[\]]*)\]/g, '.$1.')
		.split('.')
		.filter(Boolean)
);

let unifyCondition = (condition) => {
	if (typeof condition === 'function') {
		return condition;
	}

	if (condition instanceof RegExp) {
		return text => (
			condition.test(text)
		);
	}

	if (Array.isArray(condition)) {
		let arrayConditions = condition.map(unifyCondition);

		return value => (
			Array.isArray(value)
				? arrayConditions.every(cond => (
					value.some(val => cond(val))
				))
				: arrayConditions.some(cond => (
					cond(value)
				))
		);
	}

	return value => value === condition;
};

let getObjectValue = (source, selectors) => {
	let link = source;

	for (let selector of selectors) {
		if (!link[selector]) {
			return undefined;
		}

		link = link[selector];
	}

	return link;
};

class Updates {
  constructor(tamtam) {
    this.tamtam = tamtam;

    this.isStarted = false;

    this.stack = [];
    this.events = [];
    this.hearStack = [];

    this.hearFallbackHandler = (_context, next) => next();

    this.reloadMiddleware();

    this.marker = null;
  }

  getWebhookCallback() {
    return async (req, res, next) => {
      res.sendStatus(200);

      await this.pollingHandler(req.body);

      return next();
    };
  }

  hear(rawConditions, handler) {
		if (!Array.isArray(rawConditions)) {
			rawConditions = [rawConditions];
		}

		let hasConditions = rawConditions.every(Boolean);

		if (!hasConditions) {
			throw new Error('Condition should be not empty');
		}

		if (typeof handler !== 'function') {
			throw new TypeError('Handler must be a function');
    }
    
    if (!this.events.includes('message_created')) {
      this.events.push('message_created');
    }

		let textCondition = false;
		let functionCondition = false;
		let conditions = rawConditions.map((condition) => {
			if (typeof condition === 'object' && !(condition instanceof RegExp)) {
				functionCondition = true;

        let entries = Object.entries(condition)
          .map(([path, value]) => (
            [
              splitPath(path),
              unifyCondition(value),
            ]
          ));

				return (text, context) => (
					entries.every(
            ([selectors, callback]) => {
              let value = getObjectValue(context, selectors);

              return callback(value, context);
            }
          )
				);
			}

			if (typeof condition === 'function') {
				functionCondition = true;

				return condition;
			}

			textCondition = true;

			if (condition instanceof RegExp) {
				return (text, context) => {
					let passed = condition.test(text);

					if (passed) {
						context.match = text.match(condition);
					}

					return passed;
				};
			}

			condition = String(condition);

			return text => text === condition;
		});

		let needText = textCondition === true && functionCondition === false;

		this.hearStack.push((context, next) => {
			let { text } = context;

			if (needText && text === null) {
				return next();
			}

			let hasSome = conditions.some(condition => (
				condition(text, context)
			));

			return hasSome
				? handler(context, next)
				: next();
		});

		this.reloadMiddleware();

		return this;
  }
  
  setHearFallbackHandler(handler) {
		this.hearFallbackHandler = handler;

		return this;
	}

  use(...middlewares) {
    middlewares.forEach((middleware) => {
      if (typeof middleware !== 'function') {
        throw new TamTamError({
          code: 'errors.middleware',
          message: 'Middleware must be a function',
        });
      }

      this.stack.push(middleware);
    });

    this.reloadMiddleware();

    return this;
  }

  async startPolling() {
    if (this.isStarted) return;

    if (this.events.length === 0) {
      throw new TamTamError({
        code: 'errors.pollingTypes',
        message: 'No polling types found',
      });
    }

    this.isStarted = true;

    await this.startFetchLoop();
  }

  async startFetchLoop() {
    while (this.isStarted) {
      await this.fetchUpdates();
    }
  }

  async fetchUpdates() {
    let parameters = {
      limit: 1000,
      timeout: 90,
      types: this.events,
    };

    if (this.marker) parameters.marker = this.marker;

    debug('events', this.events);

    let response = await this.tamtam.api.subscriptions.getUpdates(parameters);

    debug('response', response);

    if (!response.updates.length) return;

    this.marker = response.marker || null;

    response.updates.forEach(async (update) => {
      try {
        await this.pollingHandler(update);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Handle polling error:', e);
      }
    });
  }

  async pollingHandler(update) {
    let { update_type: type, ...payload } = update;

    debug('type', type);
    debug('update', update);

    let Context = contexts[type];

    return this.dispatchMiddleware(new Context(this.tamtam, payload));
  }

  dispatchMiddleware(context) {
    return this.stackMiddleware(context, middlewareIo.noopNext);
  }

  reloadMiddleware() {
    let stack = [...this.stack];

    if (this.hearStack.length !== 0) {
      stack.push(
        middlewareIo.compose([
          ...this.hearStack,
          this.hearFallbackHandler,
        ]),
      );
    }

    this.stackMiddleware = middlewareIo.compose(stack);
  }

  on(events, handler) {
    if (!Array.isArray(events)) {
      events = [events];
    }

    events = events.filter(Boolean);

    if (!events) {
      throw new TamTamError({
        code: 'errors.noEvents',
        message: 'No events found',
      });
    }

    if (typeof handler !== 'function') {
      throw new TamTamError({
        code: 'errors.handler',
        message: 'Handler must be a function',
      });
    }

    events.forEach(event => this.events.push(event));

    return this.use((context, next) => context.is(events) ? handler(context, next) : next());
  }

  stopPolling() {
    this.isStarted = false;

    return this;
  }
}

module.exports = Updates;
