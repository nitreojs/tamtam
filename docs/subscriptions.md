# subscriptions

```js
tamtam.api.subscriptions;
```

# Methods

### get

In case your bot gets data via Webhook, the method returns list
of all subscriptions

```js
tamtam.api.subscriptions.get(); // => Promise<ISubscriptionsGetResponse>
```

### subscribe

Subscribes bot to receive updates via Webhook.
After calling this method, the bot will receive notifications about
new events in chat rooms at the specified URL

```js
tamtam.api.subscriptions.subscribe(url: string, params?: ISubscriptionsSubscribeParams); // => Promise<ISubscriptionsSubscribeResponse>
```

ISubscriptionsSubscribeParams:

| Key          | Required | Type                                            |
| ------------ | -------- | ----------------------------------------------- |
| update_types | false    | Array\<[UpdateType](interfaces.md/#UpdateType)> |
| version      | false    | string                                          |

### unsubscribe

Unsubscribes bot from receiving updates via Webhook.
After calling the method, the bot stops receiving notifications about
new events. Notification via the long-poll API becomes available for
the bot

```js
tamtam.api.subscriptions.unsubscribe(url: string); // => Promise<ISubscriptionsUnsubscribeResponse>
```

### getUpdates

You can use this method for getting updates in case your bot
is not subscribed to Webhook. The method is based on long polling

```js
tamtam.api.subscriptions.getUpdates(params?: ISubscriptionsGetUpdatesParams); // => Promise<ISubscriptionsGetUpdatesResponse>
```

ISubscriptionsGetUpdatesParams:

| Key     | Required | Type                                            |
| ------- | -------- | ----------------------------------------------- |
| limit   | false    | number                                          |
| timeout | false    | number                                          |
| marker  | false    | number                                          |
| types   | false    | Array\<[UpdateType](interfaces.md/#UpdateType)> |
