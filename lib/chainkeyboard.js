let { inspect } = require('util');

/**
 * Chain keyboard
 */
class ChainKeyboard {
  constructor() {
    this.buttons = [];
  }

  get [Symbol.toStringTag]() {
    return 'ChainKeyboard';
  }

  static POSITIVE_COLOR = 'positive';

  static NEGATIVE_COLOR = 'negative';

  static DEFAULT_COLOR = 'default';

  pushButtons(params) {
    if (!this.buttons.length) this.buttons.push([]);

    let last = this.buttons.length - 1;

    this.buttons[last].push(params);

    return this;
  }

  callbackButton({ text, intent = ChainKeyboard.DEFAULT_COLOR, payload }) {
    this.pushButtons({
      text,
      intent,
      payload,
      type: 'callback',
    });

    return this;
  }

  geoButton({ text, quick = false }) {
    this.pushButtons({
      text,
      quick,
      type: 'request_geo_location',
    });

    return this;
  }

  contactButton({ text }) {
    this.pushButtons({
      text,
      type: 'request_contact',
    });

    return this;
  }

  linkButton({ text, url }) {
    this.pushButtons({
      text,
      url,
      type: 'link',
    });

    return this;
  }

  row() {
    this.buttons.push([]);

    return this;
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      buttons: this.buttons,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }

  toJSON() {
    return [
      {
        type: 'inline_keyboard',
        payload: {
          buttons: this.buttons,
        },
      },
    ];
  }
}

module.exports = ChainKeyboard;
