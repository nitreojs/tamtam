let { TamTam } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

tamtam.updates.on('message_created', async (context) => {
  await context.reply('Do you see this? I can reply to your message real quick!');
});

/**
 * Updates are automatically collected
 * on the basis of events that were
 * passed to "updates.on"
 */
tamtam.updates.startPolling().then(() => {
  // eslint-disable-next-line no-console
  console.log('Bot started');
});
