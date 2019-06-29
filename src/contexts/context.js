class Context {
  constructor(tamtam, type) {
    this.tamtam = tamtam;
    this.type = type;
  }

  is(types) {
    if (!Array.isArray(types)) {
      types = [types];
    }

    return types.includes(this.type);
  }
}

module.exports = Context;
