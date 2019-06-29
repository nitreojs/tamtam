let { inspect } = require('util');

let Context = require('./context');

class ChatTitleChanged extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'chat_title_changed');

    this.payload = payload;
  }

  get chatId() {
    return this.payload.chat_id;
  }

  get user() {
    return this.payload.user;
  }

  get title() {
    return this.payload.title;
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

    let { user, chat_id: chatId, ...params } = this.payload;

    let payloadToInspect = {
      user,
      chatId,
      ...params,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = ChatTitleChanged;
