/**
 * Chats
 */
class Chats {
  constructor(api) {
    this.api = api;
  }

  get(chatId) {
    return this.api.request({
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
      },
    });
  }

  edit(chatId, params = {}) {
    return this.api.request({
      httpMethod: 'PATCH',
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
      },
      body: JSON.stringify(params),
    });
  }

  getChats(params = {}) {
    return this.api.request({
      apiMethod: 'chats',
      body: JSON.stringify(params),
    });
  }

  sendAction({ chatId, action }) {
    return this.api.request({
      httpMethod: 'POST',
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
        method: 'actions',
      },
      body: JSON.stringify({ action }),
    });
  }

  getChatMembership(chatId) {
    return this.api.request({
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
        method: 'members/me',
      },
    });
  }

  leave(chatId) {
    return this.api.request({
      httpMethod: 'DELETE',
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
        method: 'members/me',
      },
    });
  }

  getMembers(chatId, params = {}) {
    return this.api.request({
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
        method: 'members',
      },
      body: JSON.stringify(params),
    });
  }

  addMembers({ chatId, userIds }) {
    if (!Array.isArray(userIds)) {
      userIds = [userIds];
    }

    return this.api.request({
      httpMethod: 'POST',
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
        method: 'members',
      },
      body: JSON.stringify({ user_ids: userIds }),
    });
  }

  removeMember({ chatId, userId }) {
    return this.api.request({
      httpMethod: 'DELETE',
      apiMethod: 'chats',
      query: {
        chat_id: chatId,
        user_id: userId,
        method: 'members',
      },
    });
  }
}

module.exports = Chats;
