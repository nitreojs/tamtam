/**
 * Bots
 */
class Bots {
  constructor(api) {
    this.api = api;
  }

  getInfo() {
    return this.api.request({
      apiMethod: 'me',
    });
  }

  editInfo(params = {}) {
    return this.api.request({
      httpMethod: 'PATCH',
      apiMethod: 'me',
      body: JSON.stringify(params),
    });
  }
}

module.exports = Bots;
