class Subscriptions {
  constructor(api) {
    this.api = api;
  }

  get() {
    return this.api.request({
      apiMethod: 'subscriptions',
    });
  }

  subscribe(url, params = {}) {
    params.url = url;

    return this.api.request({
      httpMethod: 'POST',
      apiMethod: 'subscriptions',
      body: JSON.stringify(params),
    });
  }

  unsubscribe(url) {
    return this.api.request({
      httpMethod: 'DELETE',
      apiMethod: 'subscriptions',
      query: {
        url,
      },
    });
  }

  getUpdates(params = {}) {
    return this.api.request({
      apiMethod: 'updates',
      query: params,
    });
  }
}

module.exports = Subscriptions;
