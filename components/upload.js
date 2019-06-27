class Upload {
  constructor(api) {
    this.api = api;
  }

  async getUrl(type = 'photo') {
    let response = await this.api.request({
      httpMethod: 'POST',
      method: 'uploads',
      query: {
        type,
      },
    });

    return response;
  }
}

module.exports = Upload;
