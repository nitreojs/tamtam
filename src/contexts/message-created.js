let { inspect } = require('util');

let Context = require('./context');
let Attachments = require('../attachments');

let attachments = {
  sticker: Attachments.StickerAttachment,
  contact: Attachments.ContactAttachment,
  file: Attachments.FileAttachment,
  image: Attachments.ImageAttachment,
  location: Attachments.LocationAttachment,
  video: Attachments.VideoAttachment,
};

class MessageCreatedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_created');

    this.payload = payload;
  }

  get id() {
    return this.body.mid;
  }

  get text() {
    return this.body.text || '';
  }

  get senderId() {
    return this.sender.user_id;
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
    return this.body.attachments || null;
  }

  get sender() {
    let { sender } = this.payload.message;

    let result = {
      id: sender.user_id,
      ...sender,
    };

    return result;
  }

  get recipient() {
    let { recipient } = this.payload.message;

    let result = {
      chatId: recipient.chat_id || null,
      chatType: recipient.chat_type,
      userId: recipient.user_id || null,
    };

    return result;
  }

  get timestamp() {
    return this.payload.message.timestamp;
  }

  get body() {
    let { body } = this.payload.message;

    if (body.attachments) {
      body.attachments = body.attachments.map(
        (element) => {
          let Attachment = attachments[element.type];

          return Attachment ? new Attachment(element) : element;
        }
      );
    }

    return this.payload.message.body;
  }

  get isChat() {
    return this.recipient.chatType === 'chat';
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
        type: (params.link ? params.link.type : null) || 'reply',
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

    let payloadToInspect = {
      text: this.text,
      senderId: this.senderId,
      attachments: this.attachments,
      sender: this.sender,
      recipient: this.recipient,
      body: this.body,
      timestamp: this.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = MessageCreatedContext;
