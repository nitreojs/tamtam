let { inspect } = require('util');

let Attachment = require('./attachment');

class ContactAttachment extends Attachment {
  constructor({ payload, type }) {
    super({ payload, type });
  }

  get tamInfo() {
    let { user_id: id, ...info } = this.payload.tamInfo;

    let result = {
      id,
      ...info,
    };

    return result;
  }

  get [Symbol.toStringTag]() {
    return 'ContactAttachment';
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      tamInfo: this.tamInfo,
      type: this.type,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = ContactAttachment;
