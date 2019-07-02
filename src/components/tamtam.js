let { inspect } = require('util');

let API = require('./api');
let Updates = require('./updates');

/**
 * TamTam
 */
class TamTam {
  constructor({ token, version = '0.1.7' } = {}) {
    this.token = token;
    this.version = version;

    this.api = new API(this);
    this.updates = new Updates(this);
  }

  get [Symbol.toStringTag]() {
    return 'TamTam';
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let params = {
      token: this.token,
      version: this.version,
    };

    let payload = inspect(params, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = TamTam;

