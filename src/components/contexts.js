let { inspect } = require('util');

let kTamTam = Symbol('TamTam');

class Context {
  constructor(tamtam, type) {
    this[kTamTam] = tamtam;

    this.type = type;
  }

  is(types) {
    if (!Array.isArray(types)) {
      types = [types];
    }

    return types.includes(this.type);
  }
}

class MessageCallbackContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_callback');

    this[kTamTam] = tamtam;

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

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
      chat_id: this.payload.recipient.chatId,
      text,
      ...params,
    });
  }

  async reply(text, params = {}) {
    return this[kTamTam].api.messages.send({
      chat_id: this.payload.recipient.chatId,
      link: {
        type: (params.link ? params.link.type : null) || 'reply',
        mid: this.payload.body.mid,
      },
      text,
      ...params,
    });
  }

  async sendNotification(text) {
    return this[kTamTam].api.messages.answerCallback(this.payload.callback.id, {
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

class MessageCreatedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_created');

    this[kTamTam] = tamtam;
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

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
      chat_id: this.payload.message.recipient.chat_id,
      text,
      ...params,
    });
  }

  async reply(text, params = {}) {
    return this[kTamTam].api.messages.send({
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

class MessageEditedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_edited');

    this[kTamTam] = tamtam;
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

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
      chat_id: this.payload.message.recipient.chat_id,
      text,
      ...params,
    });
  }

  async reply(text, params = {}) {
    return this[kTamTam].api.messages.send({
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

    let payload = inspect(this.payload, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

class MessageRemovedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_removed');

    this[kTamTam] = tamtam;
    this.payload = payload;
  }

  get messageId() {
    return this.payload.message_id;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      messageId: this.payload.message_id,
      timestamp: this.payload.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

class ChatTitleChanged extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'chat_title_changed');

    this[kTamTam] = tamtam;
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

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
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

class UserAddedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'user_added');

    this[kTamTam] = tamtam;
    this.payload = payload;
  }

  get chatId() {
    return this.payload.chat_id;
  }

  get user() {
    return this.payload.user;
  }

  get inviterId() {
    return this.payload.inviter_id;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
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
      inviterId: this.payload.inviter_id,
      timestamp: this.payload.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

class UserRemovedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'user_removed');

    this[kTamTam] = tamtam;
    this.payload = payload;
  }

  get chatId() {
    return this.payload.chat_id;
  }

  get user() {
    return this.payload.user;
  }

  get adminId() {
    return this.payload.admin_id;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
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
      adminId: this.payload.admin_id,
      timestamp: this.payload.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

class BotStartedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'bot_started');

    this[kTamTam] = tamtam;
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

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
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

class BotAddedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'bot_added');

    this[kTamTam] = tamtam;
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

  async send(text, params = {}) {
    return this[kTamTam].api.messages.send({
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

class BotRemovedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'bot_removed');

    this[kTamTam] = tamtam;
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

module.exports = {
  Context,
  MessageCallbackContext,
  MessageCreatedContext,
  MessageEditedContext,
  MessageRemovedContext,
  UserAddedContext,
  UserRemovedContext,
  BotStartedContext,
  BotAddedContext,
  BotRemovedContext,
  ChatTitleChanged,
};
