let { inspect } = require('util');

let Context = require('./context');

class BotAddedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'bot_added');

    this.payload = payload;
  }

  get chatId() {
    return this.payload.chat_id;
  }

  get user() {
    return this.payload.user;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  send(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.payload.chat_id,
      text,
      ...params,
    });
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      chatId: this.payload.chat_id,
      user: this.payload.user,
      timestamp: this.payload.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = BotAddedContext;
