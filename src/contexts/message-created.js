let { inspect } = require('util');

let Context = require('./context');

class MessageCreatedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_created');

    this.payload = payload;
  }

  get id() {
    return this.body.mid;
  }

  get text() {
    return this.payload.message.body.text || '';
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

  get body() {
    return this.payload.message.body;
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
      chat_id: this.payload.message.recipient.chat_id,
      text,
      ...params,
    });
  }

  reply(text, params = {}) {
    return this.tamtam.api.messages.send({
      chat_id: this.payload.message.recipient.chat_id,
      link: {
        type: (params.link ? params.link.type : null) || 'reply',
        mid: this.payload.message.body.mid,
      },
      text,
      ...params,
    });
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;
    let { message } = this.payload;

    let payloadToInspect = {
      text: message.body.text,
      senderId: message.sender.userId,
      attachments: message.body.attachments,
      sender: message.sender,
      recipient: message.recipient,
      body: message.body,
      timestamp: message.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = MessageCreatedContext;
