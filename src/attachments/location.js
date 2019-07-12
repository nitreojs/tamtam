let { inspect } = require('util');

let Attachment = require('./attachment');

class LocationAttachment extends Attachment {
  constructor({ latitude, longitude, type }) {
    let payload = {
      latitude,
      longitude,
    };

    super({ payload, type });
  }

  get latitude() {
    return this.payload.latitude;
  }

  get longitude() {
    return this.payload.longitude;
  }

  get [Symbol.toStringTag]() {
    return 'LocationAttachment';
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      latitude: this.latitude,
      longitude: this.longitude,
      type: this.type,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = LocationAttachment;
