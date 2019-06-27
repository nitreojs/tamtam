/**
 * Chats
 */
class Chats {
  constructor(api) {
    this.api = api;
  }

  async get(chatId) {
    let response = await this.api.request({
      method: 'chats',
      query: {
        chat_id: chatId,
      }
    });

    return response;
  }

  async edit(chatId, params = {}) {
    let response = await this.api.request({
      httpMethod: 'PATCH',
      method: 'chats',
      query: {
        chat_id: chatId,
      },
      body: JSON.stringify(params),
    });

    return response;
  }

  async getChats(params = {}) {
    let response = await this.api.request({
      method: 'chats',
      body: JSON.stringify(params),
    });

    return response;
  }

  async sendAction(chatId, action) {
    let body = `{"action":"${action}"}`;

    let response = await this.api.request({
      httpMethod: 'POST',
      method: 'chats',
      query: {
        chat_id: chatId,
        method: 'actions',
      },
      body,
    });

    return response;
  }

  async getChatMembership(chatId) {
    let response = await this.api.request({
      method: 'chats',
      query: {
        chat_id: chatId,
        method: 'members/me',
      },
    });

    return response;
  }

  async leave(chatId) {
    let response = await this.api.request({
      httpMethod: 'DELETE',
      method: 'chats',
      query: {
        chat_id: chatId,
        method: 'members/me',
      },
    });

    return response;
  }

  async getMembers(chatId, params = {}) {
    let response = await this.api.request({
      method: 'chats',
      query: {
        chat_id: chatId,
        method: 'members',
      },
      body: JSON.stringify(params),
    });

    return response;
  }

  async addMembers(chatId, userIds) {
    let body = `{"user_ids":[${userIds}]}`;

    let response = await this.api.request({
      httpMethod: 'POST',
      method: 'chats',
      query: {
        chat_id: chatId,
        method: 'members',
      },
      body,
    });

    return response;
  }

  async removeMember(chatId, userId) {
    let response = await this.api.request({
      httpMethod: 'DELETE',
      method: 'chats',
      query: {
        chat_id: chatId,
        user_id: userId,
      },
    });

    return response;
  }
}

module.exports = Chats;
