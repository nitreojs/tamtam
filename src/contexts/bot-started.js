let { inspect } = require('util');

let Context = require('./context');

class BotStartedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'bot_started');

    this.payload = payload;
  }

  get chatId() {
    return this.payload.chat_id;
  }

  get user() {
    let { user_id: id, ...user } = this.payload.user;

    let result = {
      id,
      ...user,
    };

    return result;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  send(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.chatId,
      text,
      ...params,
    });
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      chatId: this.chat_id,
      user: this.user,
      timestamp: this.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = BotStartedContext;
