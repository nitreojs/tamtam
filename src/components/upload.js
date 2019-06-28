class Upload {
  constructor(api) {
    this.api = api;
  }

  getUrl(type = 'photo') {
    return this.api.request({
      httpMethod: 'POST',
      apiMethod: 'uploads',
      query: {
        type,
      },
    });
  }
}

module.exports = Upload;
