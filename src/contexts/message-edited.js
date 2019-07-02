let { inspect } = require('util');

let Context = require('./context');

class MessageEditedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_edited');

    this.payload = payload;
  }

  get message() {
    let { message: { sender, recipient, ...other } } = this.payload;

    let result = {
      sender: {
        userId: sender.user_id,
        name: sender.name,
        username: sender.username || null,
      },
      recipient: {
        chatId: recipient.chat_id,
        chatType: recipient.chat_type,
        userId: recipient.user_id,
      },
      ...other,
    };

    return result;
  }

  get id() {
    return this.body.mid;
  }

  get body() {
    return this.payload.message.body;
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

  get attachments() {
    return this.payload.message.body.attachments || null;
  }

  get sender() {
    let { sender } = this.payload.message;

    let result = {
      userId: sender.user_id,
      ...sender,
    };

    return result;
  }

  get recipient() {
    let { recipient } = this.payload.message;

    let result = {
      chatId: recipient.chat_id,
      chatType: recipient.chat_type,
      userId: recipient.user_id,
    };

    return result;
  }

  get timestamp() {
    return this.payload.message.timestamp;
  }

  get isChat() {
    return this.chatType === 'isChat';
  }

  get isDialog() {
    return this.chatType === 'dialog';
  }

  get isChannel() {
    return this.chatType === 'channel';
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
      chat_id: this.chatId,
      text,
      ...params,
    });
  }

  reply(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.chatId,
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

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payload = inspect(this.payload, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = MessageEditedContext;
