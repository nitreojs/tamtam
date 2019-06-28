let fetch = require('node-fetch');
let debug = require('debug')('tamtam:api');

let Bots = require('./bots');
let Chats = require('./chats');
let Messages = require('./messages');
let Subscriptions = require('./subscriptions');
let Upload = require('./upload');
let TamTamError = require('./tterror');

class API {
  constructor(tamtam) {
    this.tt = tamtam;

    this.bots = new Bots(this);
    this.chats = new Chats(this);
    this.messages = new Messages(this);
    this.subscriptions = new Subscriptions(this);
    this.upload = new Upload(this);
  }

  get [Symbol.toStringTag]() {
    return 'API';
  }

  async request(params = {}) {
    let {
      httpMethod = 'GET',
      apiMethod,
      body = {},
      query = {},
    } = params;

    let url = `https://botapi.tamtam.chat/${apiMethod}`;

    if (apiMethod === 'chats' && 'chat_id' in query) {
      url += `/${query.chat_id}${query.method ? '/' + query.method : ''}`;
    }

    url += `?access_token=${this.tt.token}&${new URLSearchParams(query)}`;

    debug(url);

    let response = await (await fetch(url, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: httpMethod !== 'GET' ? body : null,
    })).json();

    if (response.code) {
      throw new TamTamError({
        code: response.code,
        message: response.message,
      });
    }

    return response;
  }

  async call(apiMethod, { query, body, httpMethod }) {
    return this.request({
      httpMethod,
      apiMethod,
      query,
      body,
    });
  }
}

module.exports = API;
