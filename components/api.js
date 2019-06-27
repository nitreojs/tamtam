let fetch = require('node-fetch');
let { stringify } = require('querystring');

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
      method,
      body = {},
      query = {},
    } = params;

    let url = `https://test2.tamtam.chat/${method}`;

    if (method === 'chats' && 'chat_id' in query) {
      url += `/${query.chat_id}${query.method ? '/' + query.method : ''}`;
    }

    url += `?access_token=${this.tt.token}&${stringify(query)}`;

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

  async call(method, { query, body, httpMethod }) {
    let response = await this.request({
      httpMethod,
      method,
      query,
      body,
    });

    return response;
  }
}

module.exports = API;
