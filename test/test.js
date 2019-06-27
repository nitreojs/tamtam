let { TamTam, Keyboard } = require('../');

let tt = new TamTam({
  token: '5evIb7c4rf6V9J-kSC29jcZBLcHy3R-EzlJs_tsbQ4c',
});

tt.updates.on('message_created', async (ctx) => {
  if (ctx.text !== 'test') return;

  ctx.reply('What is better? Choose your fighter!', {
    attachments: Keyboard.keyboard([
      [
        Keyboard.callbackButton({
          text: 'Node.js',
          intent: Keyboard.POSITIVE_COLOR,
          payload: 'nodejs',
        }),

        Keyboard.callbackButton({
          text: 'PHP',
          intent: Keyboard.NEGATIVE_COLOR,
          payload: 'php',
        }),
      ],
    ]),
  });
});

tt.updates.on('message_callback', async (ctx) => {
  ctx.send('было совершено нажатие на кнопку');
});

tt.updates.startPolling();

// eslint-disable-next-line no-console
console.log('Bot started!');
