let { inspect } = require('util');

let Attachment = require('./attachment');

class ImageAttachment extends Attachment {
  constructor({ payload, type }) {
    super({ payload, type });
  }

  get id() {
    return this.payload.photo_id;
  }

  get token() {
    return this.payload.token;
  }

  get url() {
    return this.payload.url;
  }

  get [Symbol.toStringTag]() {
    return 'ImageAttachment';
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      id: this.id,
      token: this.token,
      url: this.url,
      type: this.type,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = ImageAttachment;
