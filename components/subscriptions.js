class Subscriptions {
  constructor(api) {
    this.api = api;
  }

  async get() {
    let response = await this.api.request({
      method: 'subscriptions',
    });

    return response;
  }

  async subscribe(url, params = {}) {
    params.url = url;

    let response = await this.api.request({
      httpMethod: 'POST',
      method: 'subscriptions',
      body: JSON.stringify(params),
    });

    return response;
  }

  async unsubscribe(url) {
    let response = await this.api.request({
      httpMethod: 'DELETE',
      method: 'subscriptions',
      query: {
        url,
      },
    });

    return response;
  }

  async getUpdates(params = {}) {
    let response = await this.api.request({
      method: 'updates',
      query: params,
    });

    return response;
  }
}

module.exports = Subscriptions;
