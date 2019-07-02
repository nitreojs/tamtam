let { inspect } = require('util');

let Context = require('./context');

class MessageRemovedContext extends Context {
  constructor(tamtam, payload) {
    super(tamtam, 'message_removed');

    this.payload = payload;
  }

  get messageId() {
    return this.payload.message_id;
  }

  get timestamp() {
    return this.payload.timestamp;
  }

  [inspect.custom](depth, options) {
    let { name } = this.constructor;

    let payloadToInspect = {
      messageId: this.messageId,
      timestamp: this.timestamp,
    };

    let payload = inspect(payloadToInspect, { ...options, compact: false });

    return `${options.stylize(name, 'special')} ${payload}`;
  }
}

module.exports = MessageRemovedContext;
