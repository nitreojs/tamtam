let { TamTam } = require('tamtam');

let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

/**
 * WARNING!
 * 
 * You SHOULD set `setHearFallbackHandler`
 * BEFORE `hear` methods,
 * in another case it WON'T work
 * 
 * WARNING!
 */
tamtam.updates.setHearFallbackHandler(async (context) => {
  await context.reply(
    'I don\'t understand you. Try writing "hi" or "what\'s up"!',
  );
});

tamtam.updates.hear(/^(hello|hi)/i, async (context) => {
  await context.reply('Hi there!');
});

tamtam.updates.hear(/^(wh?at?'?s+\s*up)/i, async (context) => {
  await context.reply('It\'s OK!');
});

tamtam.updates.startPolling();
