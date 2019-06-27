# chats

```js
tamtam.api.chats;
```

# Methods

### get

Get chat info

```js
tamtam.api.chats.get(chatId: number); // => Promise<IChatsGetResponse>
```

### edit

Edits chat info: title, icon, etc...

```js
tamtam.api.chats.edit(chatId: number, params?: IChatsEditParams); // => Promise<IChatsEditResponse>
```

IChatsEditParams:

| Key   | Required | Type                            |
| ----- | -------- | ------------------------------- |
| icon  | false    | [IPhoto](interfaces.md/#IPhoto) |
| title | false    | string                          |

### getChats

Returns info about chat

```js
tamtam.api.chats.getChats(params?: IChatsGetChatsParams); // => Promise<IChatsGetChatsResponse>
```

IChatsGetChatsParams:

| Key    | Required | Type   |
| ------ | -------- | ------ |
| count  | false    | number |
| marker | false    | number |

### sendAction

Send bot action to chat

```js
tamtam.api.chats.sendAction(chatId: number, action: Action); // => Promise<IChatsSendActionResponse>
```

### getChatMembership

Returns chat membership info for current bot

```js
tamtam.api.chats.getChatMembership(chatId: number); // => Promise<IChatsGetChatMembershipResponse>
```

### leave

Removes bot from chat members

```js
tamtam.api.chats.leave(chatId: number); // => Promise<IChatsLeaveResponse>
```

### getMembers

Returns users participated in chat

```js
tamtam.api.chats.getMembers(chatId: number, params?: IChatsGetMembersParams); // => Promise<IChatsGetMembersResponse>
```

IChatsGetMembersParams:

| Key      | Required | Type           |
| -------- | -------- | -------------- |
| user_ids | false    | Array\<number> |
| marker   | false    | number         |
| count    | false    | number         |

### addMembers

Adds members to chat. Additional permissions may require

```js
tamtam.api.chats.addMembers(chatId: number, userIds: Array<number> | number); // => Promise<IChatsAddMembersResponse>
```

### removeMember

Removes member from chat. Additional permissions may require

```js
tamtam.api.chats.removeMember(chatId: number, userId: number); // => IChatsRemoveMemberResponse
```
