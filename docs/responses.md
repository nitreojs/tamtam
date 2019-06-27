# responses

All responses are here!

## Bots responses

### IBotsGetInfoResponse

| Key             | Required | Type                                              |
| --------------- | -------- | ------------------------------------------------- |
| user_id         | true     | number                                            |
| name            | true     | string                                            |
| username        | false    | string                                            |
| avatar_url      | false    | string                                            |
| full_avatar_url | false    | string                                            |
| commands        | false    | Array\<[IBotCommand](interfaces.md/#IBotCommand)> |
| description     | false    | string                                            |

### IBotsEditInfoResponse

Equals to [IBotsGetInfoResponse](#IBotsGetInfoResponse).

## Chats responses

### IChatsGetResponse

Equals to [IChat](interfaces.md/#IChat).

### IChatsEditResponse

Equals to [IChat](interfaces.md/#IChat).

### IChatsGetChatsResponse

| Key    | Required | Type                                  |
| ------ | -------- | ------------------------------------- |
| chats  | true     | Array\<[IChat](interfaces.md/#IChat)> |
| marker | false    | number                                |

### IChatsSendActionResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### IChatsGetChatMembershipResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### IChatsLeaveResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### IChatsGetMembersResponse

| Key     | Required | Type                                              |
| ------- | -------- | ------------------------------------------------- |
| members | true     | Array\<[IChatMember](interfaces.md/#IChatMember)> |
| marker  | false    | number                                            |

### IChatsAddMembersResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### IChatsRemoveMemberResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

## Messages responses

### IMessagesGetResponse

| Key      | Required | Type                                        |
| -------- | -------- | ------------------------------------------- |
| messages | true     | Array\<[IMessage](interfaces.md/#IMessage)> |

### IMessagesSendResponse

| Key     | Required | Type                                |
| ------- | -------- | ----------------------------------- |
| message | true     | [IMessage](interfaces.md/#IMessage) |

### IMessagesEditResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### IMessagesDeleteResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### IMessagesAnswerCallbackResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

## Subscriptions responses

### ISubscriptionsGetResponse

| Key           | Required | Type                                                  |
| ------------- | -------- | ----------------------------------------------------- |
| subscriptions | true     | Array\<[ISubscription](interfaces.md/#ISubscription)> |

### ISubscriptionsSubscribeResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### ISubscriptionsUnsubscribeResponse

Equals to [ISuccess](interfaces.md/#ISuccess).

### ISubscriptionsGetUpdatesResponse

| Key     | Required | Type                                      |
| ------- | -------- | ----------------------------------------- |
| updates | true     | Array\<[IUpdate](interfaces.md/#IUpdate)> |
| marker  | true     | number                                    |

## Upload responses

### IUploadGetUrlResponse

| Key | Required | Type   |
| --- | -------- | ------ |
| url | true     | string |
