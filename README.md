<p align="center"><img src="tamtam.png"></p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/v/tamtam.svg?style=for-the-badge">
  <img alt="downloads" src="https://img.shields.io/npm/dt/tamtam.svg?style=for-the-badge">
  <img alt="code coverage" src="https://img.shields.io/codacy/grade/6e1afe0fe16a49458ba4fdf41de9b4fc.svg?style=for-the-badge&logo=codacy">
</p>

# tamtam

`tamtam` is a powerful Node.js package which allows you
to easily work with [TamTam](https://tt.me) [API](https://dev.tamtam.chat)!

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

## Links

[TamTam channel](https://tt.me/tamtam-node)

[TamTam RU chat](https://tt.me/tamtam-node-ru-chat)

[TamTam EN chat](https://tt.me/tamtam-node-en-chat)

[VK chat](https://vk.me/join/AJQ1d06ezxH/FbB3JDnQMcpT)
