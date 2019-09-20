# messages

```js
tamtam.api.messages;
```

## Methods

### get

Returns messages in chat: result page and marker referencing to the next page.
Messages traversed in reverse direction so the latest message in chat will be
first in result array. Therefore if you use `from` and `to` parameters, `to`
must be **less than** `from`

```js
tamtam.api.messages.get(params?: IMessagesGetParams); // => Promise<IMessagesGetResponse>
```

IMessagesGetParams:

| Key         | Required | Type                     |
| ----------- | -------- | ------------------------ |
| chat_id     | false    | number                   |
| message_ids | false    | Array\<string> \| string |
| from        | false    | number                   |
| to          | false    | number                   |
| count       | false    | number                   |

### send

Sends a message to a chat. As a result for this method new message identifier returns.
See [official documentary](https://dev.tamtam.chat/#operation/sendMessage)

```js
tamtam.api.messages.send(params: IMessagesSendParams); // => IMessagesSendResponse
```

IMessagesSendParams:

| Key         | Required | Type                                            |
| ----------- | -------- | ----------------------------------------------- |
| text        | false    | string                                          |
| attachments | false    | Array\<[Attachment](interfaces.md/#Attachment)> |
| link        | false    | ILink                                           |
| user_id     | false    | number                                          |
| chat_id     | false    | number                                          |
| notify      | false    | boolean                                         |

### edit

Updated message should be sent as `NewMessageBody` in a request body.
In case `attachments` field is `null`, the current message attachments won't be
changed. In case of sending an empty list in this field, all attachments will be
deleted

```js
tamtam.api.messages.edit(messageId: string, params: IMessagesEditParams); // => Promise<IMessagesEditResponse>
```

IMessagesEditParams:

| Key         | Required | Type                                            |
| ----------- | -------- | ----------------------------------------------- |
| text        | false    | string                                          |
| attachments | false    | Array\<[Attachment](interfaces.md/#Attachment)> |
| link        | false    | ILink                                           |
| user_id     | false    | number                                          |
| chat_id     | false    | number                                          |
| notify      | false    | boolean                                         |

### delete

Deletes message in a dialog or in a chat if bot has permission to delete messages

```js
tamtam.api.messages.delete(messageId: number); // => Promise<IMessagesDeleteResponse>;
```

### answerCallback

```js
tamtam.api.messages.answerCallback(callbackId: number, params: IMessagesAnswerCallbackParams);
// => Promise<IMessagesAnswerCallbackResponse>;
```

IMessagesAnswerCallbackParams:

| Key          | Required | Type                                            |
| ------------ | -------- | ----------------------------------------------- |
| message      | false    | [IParamsMessage](interfaces.md/#IParamsMessage) |
| notification | false    | string                                          |
