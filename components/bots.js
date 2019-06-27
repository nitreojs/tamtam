/**
 * Bots
 */
class Bots {
  constructor(api) {
    this.api = api;
  }

  async getInfo() {
    let response = await this.api.request({
      method: 'me',
    });

    return response;
  }

  async editInfo(params = {}) {
    let response = await this.api.request({
      httpMethod: 'PATCH',
      method: 'me',
      body: JSON.stringify(params),
    });

    return response;
  }
}

module.exports = Bots;
