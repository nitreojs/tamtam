let { TamTam, Markdown } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

tamtam.updates.on('message_created', async (context) => {
  await context.reply(`Hi there, ${Markdown.bold(context.sender.name)}!`);
});

tamtam.updates.startPolling().then(() => {
  // eslint-disable-next-line no-console
  console.log('Bot started');
});
