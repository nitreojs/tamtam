let { inspect } = require('util');

let Context = require('./context');

class BotRemovedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'bot_removed');

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

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      chatId: this.chatId,
      user: this.user,
      timestamp: this.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = BotRemovedContext;
