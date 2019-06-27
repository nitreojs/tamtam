let middlewareIo = require('middleware-io');
let debug = require('debug')('tamtam:updates');

let TamTamError = require('./tterror');
let Contexts = require('./contexts');

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

  use(...middlewares) {
		if (!Array.isArray(middlewares)) {
			throw new TamTamError({
        code: 'errors.middlewares',
				message: 'Middlewares must be an array of functions or a function',
			});
		}

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

  async startPolling(callback = () => {}) {
		if (this.isStarted) return;

		if (this.events.length === 0) {
			throw new TamTamError({
				code: 'errors.pollingTypes',
				message: 'No polling types found',
			});
		}

		this.isStarted = true;
		
		callback();

    await this.startFetchLoop();
	}

  async startFetchLoop() {
    try {
      while (this.isStarted) {
        await this.fetchUpdates();
      }
    } catch (e) {
      throw e;
    }
  }

  async fetchUpdates() {
		let parameters = {
			limit: 1000,
			timeout: 90,
			types: this.events,
		};

		if (this.marker) {
			parameters['marker'] = this.marker;
		}

		debug('events', this.events);

    let response = await this.tamtam.api.subscriptions.getUpdates(parameters);
		
		debug('response', response);

		if (!response.updates.length) return;

		this.marker = response.marker || null;

    response.updates.forEach(async (update) => {
      try {
        await this.pollingHandler(update);
      } catch (e) {
        console.error('Handle polling error:', e);
      }
		});
  }

  setHearFallbackHandler(handler) {
		this.hearFallbackHandler = handler;

		return this;
	}

  async pollingHandler(update) {
		let { update_type: type, ...payload } = update;
		
		debug('type', type);
		debug('update', update);

		let Context = contexts[type];

		debug('Context', Context);

    return this.dispatchMiddleware(new Context(this.tamtam, payload));
  }

  dispatchMiddleware(context) {
		return this.stackMiddleware(context, middlewareIo.noopNext);
  }
  
  reloadMiddleware() {
		const stack = [...this.stack];

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
