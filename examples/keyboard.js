let { TamTam, Keyboard } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

tamtam.updates.on('message_created', async (context) => {
  if (context.text === 'keyboard') {
    await context.send('Here is your keyboard!', {
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

tamtam.updates.startPolling().then(() => {
  // eslint-disable-next-line no-console
  console.log('Bot started');
});

