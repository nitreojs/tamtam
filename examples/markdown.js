let { TamTam, Markdown } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

tamtam.updates.on('message_created', async (ctx) => {
  await ctx.reply(`Hi there, ${Markdown.bold(ctx.sender.name)}!`);
});

tamtam.updates.startPolling();

// eslint-disable-next-line no-console
console.log('Bot started');
