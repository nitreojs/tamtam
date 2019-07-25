class Messages {
  constructor(api) {
    this.api = api;
  }

  get(params = {}) {
    return this.api.request({
      apiMethod: 'messages',
      query: params,
    });
  }

  send(params) {
    let query = {};

    if (params.user_id) query.user_id = params.user_id;
    if (params.chat_id) query.chat_id = params.chat_id;

    Object.assign(params, {
      text: params.text || null,
      attachments: params.attachments || null,
      link: params.link || null,
    });

    return this.api.request({
      httpMethod: 'POST',
      apiMethod: 'messages',
      query,
      body: JSON.stringify(params),
    });
  }

  edit(messageId, params) {
    return this.api.request({
      httpMethod: 'PUT',
      apiMethod: 'messages',
      query: {
        message_id: messageId,
      },
      body: JSON.stringify(params),
    });
  }

  delete(messageId) {
    return this.api.request({
      httpMethod: 'DELETE',
      apiMethod: 'messages',
      query: {
        message_id: messageId,
      },
    });
  }

  answerCallback(callbackId, params = {}) {
    return this.api.request({
      httpMethod: 'POST',
      apiMethod: 'answers',
      query: {
        callback_id: callbackId,
      },
      body: JSON.stringify(params),
    });
  }
}

module.exports = Messages;
