# interfaces

Here you can find **interfaces** or **types** such as `Action` or `UpdateType`.

## Permission

**Enum**: `read_all_messages`, `add_remove_members`, `add_admins`,
`change_chat_info`, `pin_message` or `write`

## ILink

| Key  | Required | Type                    |
| ---- | -------- | ----------------------- |
| type | true     | [ILinkType](#ILinkType) |
| mid  | true     | string                  |

## ILinkType

**Enum**: `forward` or `reply`

## IBotCommand

| Key         | Required | Type   |
| ----------- | -------- | ------ |
| name        | true     | string |
| description | false    | string |

## IPhoto

| Key   | Required | Type   |
| ----- | -------- | ------ |
| url   | true     | string |
| token | true     | string |
| id    | true     | number |

## IPhotoToken

| Key   | Required | Type   |
| ----- | -------- | ------ |
| token | true     | string |

## Action

**Enum**: `typing_on`, `typing_off`, `sending_photo`, `sending_video`,
`sending_audio` or `mark_seen`

## Attachment

**Enum**: [`IAttachmentAudio`](#IAttachmentAudio),
[`IAttachmentContact`](#IAttachmentContact),
[`IAttachmentFile`](#IAttachmentFile),
[`IAttachmentImage`](#IAttachmentImage),
[`IAttachmentInlineKeyboard`](#IAttachmentInlineKeyboard),
[`IAttachmentSticker`](#IAttachmentSticker) or
[`IAttachmentVideo`](#IAttachmentVideo) *(clickable)*

## IAttachmentAudio

| Key     | Required | Type                                                |
| ------- | -------- | --------------------------------------------------- |
| type    | true     | 'audio'                                             |
| payload | true     | [IAttachmentAudioPayload](#IAttachmentAudioPayload) |

## IAttachmentAudioPayload

| Key   | Required | Type   |
| ----- | -------- | ------ |
| id    | true     | number |
| token | true     | string |

## IAttachmentContact

| Key     | Required | Type                                                    |
| ------- | -------- | ------------------------------------------------------- |
| type    | true     | 'contact'                                               |
| payload | true     | [IAttachmentContactPayload](#IAttachmentContactPayload) |

## IAttachmentContactPayload

| Key       | Required | Type            |
| --------- | -------- | --------------- |
| name      | false    | string          |
| contactId | false    | number          |
| vcfInfo   | false    | string          |
| vcfPhone  | false    | string          |
| tamInfo   | false    | [IUser](#IUser) |

## IAttachmentFile

| Key     | Required | Type                                              |
| ------- | -------- | ------------------------------------------------- |
| type    | true     | 'file'                                            |
| payload | true     | [IAttachmentFilePayload](#IAttachmentFilePayload) |

## IAttachmentFilePayload

| Key      | Required | Type   |
| -------- | -------- | ------ |
| id       | true     | number |
| size     | true     | number |
| filename | true     | string |
| url      | true     | string |
| token    | true     | string |

## IAttachmentImage

| Key     | Required | Type              |
| ------- | -------- | ----------------- |
| type    | true     | 'image'           |
| payload | true     | [IPhoto](#IPhoto) |

## IAttachmentInlineKeyboard

| Key     | Required | Type                                        |
| ------- | -------- | ------------------------------------------- |
| type    | true     | 'inline_keyboard'                           |
| payload | true     | [IAttachmentInlineKeyboardPayload][payload] |

## IAttachmentInlineKeyboardPayload

| Key     | Required | Type                              |
| ------- | -------- | --------------------------------- |
| buttons | true     | Array\<Array\<[Button](#Button)>> |

## IAttachmentSticker

| Key     | Required | Type                                                    |
| ------- | -------- | ------------------------------------------------------- |
| type    | true     | 'sticker'                                               |
| payload | true     | [IAttachmentStickerPayload](#IAttachmentStickerPayload) |

## IAttachmentStickerPayload

| Key    | Required | Type   |
| ------ | -------- | ------ |
| code   | true     | string |
| url    | true     | string |
| width  | true     | string |
| height | true     | string |

## IAttachmentVideo

| Key     | Required | Type                                                |
| ------- | -------- | --------------------------------------------------- |
| type    | true     | 'video'                                             |
| payload | true     | [IAttachmentVideoPayload](#IAttachmentVideoPayload) |

## IAttachmentVideoPayload

| Key   | Required | Type   |
| ----- | -------- | ------ |
| id    | true     | number |
| token | true     | string |

## Button

**Enum**: [`IButtonCallback`](#IButtonCallback), [`IButtonLink`](#IButtonLink),
[`IButtonRequestContact`](#IButtonRequestContact) or
[`IButtonRequestGeoLocation`](#IButtonRequestGeoLocation) *(clickable)*

## IButtonCallback

| Key     | Required | Type                          |
| ------- | -------- | ----------------------------- |
| type    | true     | 'callback'                    |
| text    | true     | string                        |
| payload | false    | string                        |
| color   | false    | [ButtonIntent](#ButtonIntent) |

## IButtonLink

| Key  | Required | Type   |
| ---- | -------- | ------ |
| type | true     | 'link' |
| text | true     | string |
| url  | true     | string |

## IButtonRequestContact

| Key  | Required | Type              |
| ---- | -------- | ----------------- |
| type | true     | 'request_contact' |
| text | true     | string            |

## IButtonRequestGeoLocation

| Key   | Required | Type                   |
| ----- | -------- | ---------------------- |
| type  | true     | 'request_geo_location' |
| text  | true     | string                 |
| quick | false    | boolean                |

## ButtonIntent

**Enum**: `positive`, `negative` or `default`

## IParamsMessage

| Key         | Required | Type                              |
| ----------- | -------- | --------------------------------- |
| text        | false    | string                            |
| attachments | false    | Array\<[Attachment](#Attachment)> |
| link        | false    | ILink                             |
| user_id     | false    | number                            |
| chat_id     | false    | number                            |
| notify      | false    | boolean                           |

## UpdateType

**Enum**: `message_callback`, `message_created`, `message_edited`,
`message_removed`, `bot_added`, `bot_removed`, `user_added`,
`user_removed`, `bot_started` or `chat_title_changed`

## Type

**Enum**: `photo`, `video`, `audio` or `file`

## ChatType

**Enum**: `dialog`, `chat` or `channel`

## ChatStatus

**Enum**: `active`, `removed`, `left`, `closed` or `suspended`

## IIcon

| Key | Required | Type   |
| --- | -------- | ------ |
| url | true     | string |

## IParticipants

This object can contain any *string* key with *number* value.

## IChat

| Key                | Required | Type                            |
| ------------------ | -------- | ------------------------------- |
| chat_id            | true     | number                          |
| type               | true     | [ChatType](#ChatType)           |
| status             | true     | [ChatStatus](#ChatStatus)       |
| last_event_time    | true     | number                          |
| participants_count | true     | number                          |
| is_public          | true     | boolean                         |
| title              | false    | string                          |
| icon               | false    | [IIcon](#IIcon)                 |
| owner_id           | false    | number                          |
| participants       | false    | [IParticipants](#IParticipants) |
| link               | false    | string                          |
| description        | false    | any                             |

## ISuccess

| Key     | Required | Type    |
| ------- | -------- | ------- |
| success | true     | boolean |

## IChatMember

| Key             | Required | Type                              |
| --------------- | -------- | --------------------------------- |
| user_id         | true     | number                            |
| name            | true     | string                            |
| username        | false    | string                            |
| avatar_url      | false    | string                            |
| full_avatar_url | false    | string                            |
| is_owner        | true     | boolean                           |
| is_admin        | true     | boolean                           |
| join_time       | true     | boolean                           |
| permissions     | false    | Array\<[Permission](#Permission)> |

## IMessage

| Key       | Required | Type                                    |
| --------- | -------- | --------------------------------------- |
| sender    | false    | [IUser](#IUser)                         |
| recipient | true     | [IMessageRecipient](#IMessageRecipient) |
| timestamp | true     | number                                  |
| link      | false    | [ILink](#ILink)                         |
| body      | true     | [IMessageBody](#IMessageBody)           |
| stat      | false    | [IMessageStat](#IMessageStat)           |

## IUser

| Key      | Required | Type   |
| -------- | -------- | ------ |
| id       | true     | number |
| name     | true     | string |
| username | false    | string |

## IMessageRecipient

| Key      | Required | Type                  |
| -------- | -------- | --------------------- |
| chatId   | false    | number                |
| chatType | true     | [ChatType](#ChatType) |
| userId   | false    | number                |

## IMessageBody

| Key         | Required | Type                              |
| ----------- | -------- | --------------------------------- |
| mid         | true     | string                            |
| seq         | true     | number                            |
| text        | false    | string                            |
| attachments | false    | Array\<[Attachment](#Attachment)> |

## IMessageStat

| Key   | Required | Type   |
| ----- | -------- | ------ |
| views | true     | number |

## UploadType

**Enum**: `photo`, `video`, `audio` or `file`

## ISubscription

| Key          | Required | Type                              |
| ------------ | -------- | --------------------------------- |
| url          | false    | string                            |
| time         | false    | number                            |
| update_types | false    | Array\<[UpdateType](#UpdateType)> |
| version      | false    | string                            |

## Update

**Enum**: [`IUpdateMessageCallback`](#IUpdateMessageCallback),
[`IUpdateMessageCreated`](#IUpdateMessageCreated),
[`IUpdateMessageRemoved`](#IUpdateMessageRemoved),
[`IUpdateMessageEdited`](#IUpdateMessageEdited),
[`IUpdateBotAdded`](#IUpdateBotAdded),
[`IUpdateBotRemoved`](#IUpdateBotRemoved),
[`IUpdateUserAdded`](#IUpdateUserAdded),
[`IUpdateUserRemoved`](#IUpdateUserRemoved),
[`IUpdateBotStarted`](#IUpdateBotStarted) or
[`IUpdateChatTitleChanged`](#IUpdateChatTitleChanged) *(clickable)*

## IUpdateMessageCallback

| Key         | Required | Type                                       |
| ----------- | -------- | ------------------------------------------ |
| update_type | true     | 'message_callback'                         |
| timestamp   | true     | number                                     |
| callback    | true     | [IUpdateMessageCallbackCallback][callback] |
| message     | false    | [IMessage](#IMessage)                      |

## IUpdateMessageCallbackCallback

| Key         | Required | Type            |
| ----------- | -------- | --------------- |
| timestamp   | true     | number          |
| callback_id | true     | string          |
| payload     | false    | string          |
| user        | true     | [IUser](#IUser) |

## IUpdateMessageCreated

| Key         | Required | Type                  |
| ----------- | -------- | --------------------- |
| update_type | true     | 'message_created'     |
| timestamp   | true     | number                |
| message     | true     | [IMessage](#IMessage) |

## IUpdateMessageRemoved

| Key         | Required | Type              |
| ----------- | -------- | ----------------- |
| update_type | true     | 'message_removed' |
| timestamp   | true     | number            |
| message_id  | true     | string            |

## IUpdateMessageEdited

| Key         | Required | Type                  |
| ----------- | -------- | --------------------- |
| update_type | true     | 'message_edited'      |
| timestamp   | true     | number                |
| message     | true     | [IMessage](#IMessage) |

## IUpdateBotAdded

| Key         | Required | Type            |
| ----------- | -------- | --------------- |
| update_type | true     | 'bot_added'     |
| timestamp   | true     | number          |
| chat_id     | true     | number          |
| user        | true     | [IUser](#IUser) |

## IUpdateBotRemoved

| Key         | Required | Type            |
| ----------- | -------- | --------------- |
| update_type | true     | 'bot_removed'   |
| timestamp   | true     | number          |
| chat_id     | true     | number          |
| user        | true     | [IUser](#IUser) |

## IUpdateUserAdded

| Key         | Required | Type            |
| ----------- | -------- | --------------- |
| update_type | true     | 'user_added'    |
| timestamp   | true     | number          |
| chat_id     | true     | number          |
| user        | true     | [IUser](#IUser) |
| inviter_id  | true     | number          |

## IUpdateUserRemoved

| Key         | Required | Type            |
| ----------- | -------- | --------------- |
| update_type | true     | 'user_removed'  |
| timestamp   | true     | number          |
| chat_id     | true     | number          |
| user        | true     | [IUser](#IUser) |
| admin_id    | true     | number          |

## IUpdateBotStarted

| Key         | Required | Type            |
| ----------- | -------- | --------------- |
| update_type | true     | 'bot_started'   |
| timestamp   | true     | number          |
| chat_id     | true     | number          |
| user        | true     | [IUser](#IUser) |

## IUpdateChatTitleChanged

| Key         | Required | Type                 |
| ----------- | -------- | -------------------- |
| update_type | true     | 'chat_title_changed' |
| timestamp   | true     | number               |
| chat_id     | true     | number               |
| user        | true     | [IUser](#IUser)      |
| title       | true     | string               |

[payload]: #IAttachmentInlineKeyboardPayload
[callback]: #IUpdateMessageCallbackCallback
