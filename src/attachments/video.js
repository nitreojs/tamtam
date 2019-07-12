let { inspect } = require('util');

let Attachment = require('./attachment');

class VideoAttachment extends Attachment {
  constructor({ payload, type }) {
    super({ payload, type });
  }

  get url() {
    return this.payload.url;
  }

  get token() {
    return this.payload.token;
  }

  get id() {
    return this.payload.id;
  }

  get [Symbol.toStringTag]() {
    return 'VideoAttachment';
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      url: this.url,
      token: this.token,
      id: this.id,
      type: this.type,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = VideoAttachment;
