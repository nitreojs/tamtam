class Messages {
  constructor(api) {
    this.api = api;
  }

  async get(params = {}) {
    let response = await this.api.request({
      method: 'messages',
      body: JSON.stringify(params),
    });

    return response;
  }

  async send(params) {
    let query = {};
    if (params.user_id) query.user_id = params.user_id;
    if (params.chat_id) query.chat_id = params.chat_id;

    let response = await this.api.request({
      httpMethod: 'POST',
      method: 'messages',
      query,
      body: JSON.stringify(params),
    });

    return response;
  }

  async edit(messageId, params) {
    let response = await this.api.request({
      httpMethod: 'PUT',
      method: 'messages',
      query: {
        message_id: messageId,
      },
      body: JSON.stringify(params),
    });

    return response;
  }

  async delete(messageId) {
    let response = await this.api.request({
      httpMethod: 'DELETE',
      method: 'messages',
      query: {
        message_id: messageId,
      },
    });

    return response;
  }

  async answerCallback(callbackId, params) {
    let response = await this.api.request({
      httpMethod: 'POST',
      method: 'answers',
      query: {
        callback_id: callbackId,
      },
      body: JSON.stringify(params),
    });

    return response;
  }
}

module.exports = Messages;
