let { TamTam } = require('tamtam');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let tamtam = new TamTam({
  token: 'CO-q7O0h33GT1FkCDyWfMGJi6RtjWIJrLVGB3l7CPR4',
});

/**
 * You should subscribe to webhook updates!
 * 
 * Check [this page](https://dev.tamtam.chat/#operation/subscribe)
 * to subscribe to updates or
 * use API method.
 */

tamtam.api.subscriptions.subscribe('https://example.com', {
  update_types: ['message_created'],
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', tamtam.updates.getWebhookCallback());

tamtam.updates.on('message_created', async (ctx) => {
  ctx.send('Check this out! I\'m working!');
});

console.log('Bot started.');
