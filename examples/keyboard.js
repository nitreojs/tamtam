let { TamTam, Keyboard } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

tamtam.updates.on('message_created', async (ctx) => {
  if (ctx.text === 'keyboard') {
    await ctx.send('Here is your keyboard!', {
      attachments: Keyboard.keyboard([
        [
          Keyboard.callbackButton({
            text: 'Red (negative) button',
            color: Keyboard.NEGATIVE_COLOR,
          }),

          Keyboard.callbackButton({
            text: 'Default button',
          }),
        ],

        [
          Keyboard.callbackButton({
            text: 'Blue (positive) button',
            color: Keyboard.POSITIVE_COLOR,
            payload: 'some payload here',
          }),
        ],
      ]),
    });
  }
});

tamtam.updates.startPolling('message_created');

// eslint-disable-next-line no-console
console.log('Bot started');
