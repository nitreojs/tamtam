let { inspect } = require('util');

let Attachment = require('./attachment');

class FileAttachment extends Attachment {
  constructor({
    payload,
    filename,
    size,
    type,
  }) {
    payload = {
      ...payload,
      filename,
      size,
    };

    super({ payload, type });
  }

  get url() {
    return this.payload.url;
  }

  get token() {
    return this.payload.token;
  }

  get id() {
    return this.payload.fileId;
  }

  get filename() {
    return this.payload.filename;
  }

  get size() {
    return this.payload.size;
  }

  get [Symbol.toStringTag]() {
    return 'FileAttachment';
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

module.exports = FileAttachment;
