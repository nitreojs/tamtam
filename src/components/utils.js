let { Readable } = require('stream');

class Utils {
  static bufferToStream(buffer) {
    return new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      }
    });
  }

  // by @isinkin
  static streamToBuffer(stream) {
    return new Promise(
      async (resolve, reject) => {
        stream.on('error', reject);

        let chunks = [];

        for await (let chunk of stream) {
          chunks.push(chunk);
        }

        let buffer = Buffer.concat(chunks);

        resolve(buffer);
      }
    );
  }
}

module.exports = Utils;
