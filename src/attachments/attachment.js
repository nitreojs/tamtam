class Attachment {
  constructor({ payload, type }) {
    this.payload = payload;
    this.type = type;
  }

  get [Symbol.toStringTag]() {
    return 'Attachment';
  }
}

module.exports = Attachment;
