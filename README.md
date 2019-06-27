<p align="center"><img src="tamtam.png"></p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/tamtam.svg?style=for-the-badge">
  <img alt="size" src="https://img.shields.io/bundlephobia/min/tamtam.svg?style=for-the-badge">
  <img alt="downloads" src="https://img.shields.io/npm/dt/tamtam.svg?style=for-the-badge">
</p>

# tamtam

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4e22ff311d734ffb9c426393ada10c44)](https://app.codacy.com/app/nitreojs/tamtam?utm_source=github.com&utm_medium=referral&utm_content=nitreojs/tamtam&utm_campaign=Badge_Grade_Dashboard)

tamtam is a powerful Node.js package which allows you to easily work with [TamTam](https://tt.me) [API](https://dev.tamtam.chat)!

## Installation

### Yarn

```bash
yarn add tamtam
```

### NPM

```bash
npm i tamtam -S
```

## Example usage

```js
let { TamTam } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

/* ... */

tamtam.api.messages.send({
  chat_id: chatId,
  text: 'Hi there boys!',
}).then(console.log).catch(console.error);
```

More examples you can see [here](examples/README.md).

## API

API review you can find [here](docs/README.md).
