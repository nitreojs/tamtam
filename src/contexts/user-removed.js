let { inspect } = require('util');

let Context = require('./context');

class UserRemovedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'user_removed');

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

  get adminId() {
    return this.payload.admin_id;
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
      chatId: this.chatId,
      user: this.user,
      adminId: this.adminId,
      timestamp: this.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = UserRemovedContext;
