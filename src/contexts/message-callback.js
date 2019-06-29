let { inspect } = require('util');

let Context = require('./context');

class MessageCallbackContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_callback');

    let { message: { sender: { user_id: senderUserId, ...sender }, recipient, body }, callback, timestamp } = payload;

    sender = {
      userId: senderUserId,
      ...sender,
    };

    recipient = {
      chatId: recipient.chat_id,
      chatType: recipient.chat_type,
      userId: recipient.user_id || null,
    };

    callback = {
      ...callback,
      id: callback.callback_id,
      user: {
        userId: callback.user.user_id,
        name: callback.user.name,
        username: callback.user.username || null,
      },
    };

    delete callback.callback_id;

    this.payload = {
      id: body.mid,
      sender,
      recipient,
      callback,
      body: body,
      timestamp,
    };
  }

  get sender() {
    return this.payload.sender;
  }

  get recipient() {
    return this.payload.recipient;
  }

  get callback() {
    return this.payload.callback;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  get body() {
    return this.payload.body;
  }

  get id() {
    return this.payload.body.mid;
  }

  get text() {
    return this.payload.body.text || '';
  }

  get attachments() {
    return this.payload.body.attachments || null;
  }

  send(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.payload.recipient.chatId,
      text,
      ...params,
    });
  }

  reply(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.payload.recipient.chatId,
      link: {
        type: (params.link ? params.link.type : null) || 'reply',
        mid: this.payload.body.mid,
      },
      text,
      ...params,
    });
  }

  sendNotification(text) {
    return this.tamtam.api.messages.answerCallback(this.payload.callback.id, {
      user_id: this.payload.callback.user.userId,
      notification: text,
    });
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payload = inspect(this.payload, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = MessageCallbackContext;
