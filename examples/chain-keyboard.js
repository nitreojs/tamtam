let { TamTam, ChainKeyboard } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

let chainKeyboard = new ChainKeyboard();

tamtam.updates.on('message_created', async (context) => {
  if (context.text === 'keyboard') {
    await context.send('Here is your keyboard!', {
      attachments: chainKeyboard
        .callbackButton({
          text: 'Blue (positive) button',
          intent: ChainKeyboard.POSITIVE_COLOR,
        })
        .callbackButton({
          text: 'Red (negative) button',
          intent: ChainKeyboard.NEGATIVE_COLOR,
        })
        .row()
        .linkButton({
          text: 'Gooooooogle!',
          url: 'google.com',
        }),
    });
  }
});

tamtam.updates.startPolling().then(() => {
  // eslint-disable-next-line no-console
  console.log('Bot started');
});
