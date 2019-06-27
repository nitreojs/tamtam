let { inspect } = require('util');

let TamTamError = require('../components/tterror');

class Keyboard {
  constructor() {
    this.buttons = [];
  }

  get [Symbol.toStringTag]() {
    return 'Keyboard';
  }

  static POSITIVE_COLOR = 'positive';

  static NEGATIVE_COLOR = 'negative';

  static DEFAULT_COLOR = 'default';

  static keyboard = (rows) => {
    if (rows.length > 30) {
      throw new TamTamError({
        code: 'errors.keyboardRowsLimit',
        message: 'Too many rows, maximum: 30',
      });
    }

    let keyboard = new Keyboard();

    for (let row of rows) {
      keyboard.addRow(row);
    }

    return [
      {
        type: 'inline_keyboard',
        payload: {
          buttons: keyboard.buttons,
        },
      }
    ];
  }

  static callbackButton({ text, intent = Keyboard.DEFAULT_COLOR, payload }) {
    return {
      text,
      type: 'callback',
      intent,
      payload,
    };
  }

  static geoButton({ text, quick = false }) {
    return {
      text,
      type: 'request_geo_location',
      quick,
    };
  }

  static contactButton({ text }) {
    return {
      text,
      type: 'request_contact',
    };
  }

  static linkButton({ text, url }) {
    return {
      text,
      type: 'link',
      url,
    };
  }

  addRow(row) {
    if (!Array.isArray(row)) {
      row = [row];
    }

    if (row.length > 20) {
      throw new TamTamError({
        code: 'errors.keyboardButtonsInRowLimit',
        message: 'Too many buttons in a row, maximum: 20',
      });
    }

    this.buttons.push(row);

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

  toString() {
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

module.exports = Keyboard;
