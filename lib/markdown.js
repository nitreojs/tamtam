class Markdown {
  static bold(text) {
    return `*${text}*`;
  }

  static italic(text) {
    return `_${text}_`;
  }

  static code(text) {
    return `\`${text}\``;
  }
}

module.exports = Markdown;
