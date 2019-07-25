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
      query: {
        method,
        ...query
      } = {},
    } = params;

    let url = `https://botapi.tamtam.chat/${apiMethod}`;

    if (apiMethod === 'chats' && chat_id !== undefined) {
      url += `/${query.chat_id}${method ? `/${method}` : ''}`;
    }

    url += `?access_token=${this.tt.token}&${new URLSearchParams(query)}&v=${this.tt.version}`;

    debug('url', url);

    let response = await fetch(url, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      body: httpMethod !== 'GET' ? body : null,
    });

    let json = await response.json();

    debug(json);

    if (json.code) {
      throw new TamTamError({
        code: json.code,
        message: json.message,
      });
    }

    return json;
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
