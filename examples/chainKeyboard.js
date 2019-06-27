let { TamTam, ChainKeyboard } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

let chainKeyboard = new ChainKeyboard();

tamtam.updates.on('message_created', async (ctx) => {
  if (ctx.text === 'keyboard') {
    await ctx.send('Here is your keyboard!', {
      attachments: chainKeyboard.callbackButton({
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

tamtam.updates.startPolling('message_created');

console.log('Bot started');
