let { inspect } = require('util');

let Context = require('./context');

class MessageCallbackContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_callback');

    this.payload = payload;
  }

  get id() {
    return this.body.mid;
  }

  get text() {
    return this.body.text || '';
  }

  get senderId() {
    return this.sender.userId;
  }

  get chatId() {
    if (!this.isChat) return null;

    return this.recipient.chatId;
  }

  get chatType() {
    if (!this.isChat) return null;

    return this.recipient.chatType;
  }

  get message() {
    return this.payload.message;
  }

  get attachments() {
    return this.body.attachments || null;
  }

  get body() {
    return this.message.body;
  }

  get sender() {
    let { user_id: id, ...sender } = this.message;

    let result = {
      id,
      ...sender,
    };

    return result;
  }

  get recipient() {
    let { recipient } = this.message;

    let result = {
      chatId: recipient.chat_id,
      chatType: recipient.chat_type,
      userId: recipient.user_id || null,
    };

    return result;
  }

  get callback() {
    let { callback: { user, ...callback } } = this.payload;

    let result = {
      id: callback.callback_id,
      timestamp: callback.timestamp,
      payload: callback.payload,
      user: {
        id: user.user_id,
        name: user.name,
        username: user.username || null,
      },
    };

    return result;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  get isChat() {
    return this.recipient.chatType === 'isChat';
  }

  get isDialog() {
    return this.recipient.chatType === 'dialog';
  }

  get isChannel() {
    return this.recipient.chatType === 'channel';
  }

  get hasText() {
    return this.text.length !== 0;
  }

  hasAttachments(type = null) {
    if (type === null) return this.attachments.length > 0;

    return this.attachments.some(attachment => attachment.type === type);
  }

  getAttachments(type = null) {
    if (type === null) return this.attachments;

    return this.attachments.filter(attachment => attachment.type === type);
  }

  send(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.recipient.chatId,
      text,
      ...params,
    });
  }

  reply(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.recipient.chatId,
      link: {
        type: 'link' in params ? params.link.type : 'reply',
        mid: this.id,
      },
      text,
      ...params,
    });
  }

  forward(text, params = {}) {
    return this.reply(text, {
      chat_id: this.recipient.chatId,
      link: {
        type: 'link' in params ? params.link.type : 'forward',
        mid: this.id,
      },
      ...params,
    });
  }

  sendNotification(text) {
    return this.tamtam.api.messages.answerCallback(
      this.payload.callback.id,
      {
        user_id: this.payload.callback.user.userId,
        notification: text,
      },
    );
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payload = inspect(this.payload, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = MessageCallbackContext;
