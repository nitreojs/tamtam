let { inspect } = require('util');

let Attachment = require('./attachment');

class StickerAttachment extends Attachment {
  constructor({ payload, width, height, type }) {
    payload = {
      ...payload,
      width,
      height,
    };

    super({ payload, type });
  }

  get width() {
    return this.payload.width;
  }

  get height() {
    return this.payload.height;
  }

  get code() {
    return this.payload.code;
  }

  get url() {
    return this.payload.url;
  }

  get [Symbol.toStringTag]() {
    return 'StickerAttachment';
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      code: this.code,
      url: this.url,
      height: this.height,
      width: this.width,
      type: this.type,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = StickerAttachment;
