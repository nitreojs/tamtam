import {
  Attachment,
  IBotCommand,
  ILink,
  IMessage,
  IUser,
  IParamsMessage,
  IPhoto,
} from './interfaces';

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type UpdateType = "message_callback" | "message_created" | "message_edited"
  | "message_removed" | "bot_added" | "bot_removed"
  | "user_added" | "user_removed" | "bot_started"
  | "chat_title_changed";
type ButtonColor = "positive" | "negative" | "default";
type Action = "typing_on" | "typing_off" | "sending_photo"
  | "sending_video" | "sending_audio" | "mark_seen";

interface IPartial {
  [key: string]: any;
}

interface ICallback {
  /**
   * Unix-time when user pressed the button
   */
  timestamp: number;

  /**
   * Current button identifier
   */
  id: string;

  /**
   * User who pressed the button
   */
  user: IUser;

  /**
   * Button payload
   */
  payload: string;
}

export interface ITamTamParams {
  /**
   * Bot's token
   */
  token: string;

  /**
   * API version
   */
  version?: string;
}

export interface IBotsEditInfoParams {
  /**
   * Visible name of bot, from 1 to 64 characters
   */
  name?: string | null;

  /**
   * Bot unique identifier.
   * It can be any string 4-64 characters long containing
   * any digit, letter or special symbols: "-" or "_".
   * It must starts with a letter
   */
  username?: string | null;

  /**
   * Bot description up to 16k characters long
   */
  description?: string | null;

  /**
   * Commands supported by bot.
   * Pass empty list if you want to remove commands, <= 32 items
   */
  commands?: Array<IBotCommand> | null;

  /**
   * Request to set bot photo
   */
  photo?: IPhoto | null;
}

export interface IChatsEditParams {
  /**
   * Request to attach image. All fields are mutually exclusive
   */
  icon?: IPhoto | null;

  title?: string | null;
}

export interface IChatsGetChatsParams {
  /**
   * Number of chats requested, default: 50
   */
  count?: number;

  /**
   * Points to next data page, null for the first page
   */
  marker?: number;
}

export interface IChatsGetMembersParams {
  /**
   * Comma-separated list of users identifiers to get their membership.
   * When this parameter is passed, both count and marker are ignored.
   */
  user_ids?: Array<number> | null;

  /**
   * Marker
   */
  marker?: number;

  /**
   * Count
   */
  count?: number;
}

export interface IMessagesGetParams {
  /**
   * Chat identifier to get messages in chat
   */
  chat_id?: number;

  /**
   * Messages ids you want to get
   */
  message_ids?: Array<string> | string | null;

  /**
   * Start time for requested messages
   */
  from?: number;

  /**
   * End time for requested messages
   */
  to?: number;

  /**
   * Maximum amount of messages in response, from 1 to 100, default: 50
   */
  count?: number;
}

export interface IMessagesSendParams {
  /**
   * Message text, <= 4000 characters
   */
  text?: string | null;

  /**
   * Message attachments. See `AttachmentRequest` and it"s inheritors for full information.
   */
  attachments?: Array<Attachment> | null;

  /**
   * Link to Message
   */
  link?: ILink | null;

  /**
   * Fill this parameter if you want to send message to user
   */
  user_id?: number;

  /**
   * Fill this if you send message to chat
   */
  chat_id?: number;

  /**
   * If false, chat participants wouldn"t be notified, default: true
   */
  notify?: boolean;
}

export interface IMessagesEditParams {
  /**
   * Message text, <= 4000 characters
   */
  text?: string | null;

  /**
   * Message attachments. See AttachmentRequest and it"s inheritors for full information.
   */
  attachments?: Array<Attachment> | null;

  /**
   * Link to Message
   */
  link?: ILink | null;

  /**
   * Fill this parameter if you want to send message to user
   */
  user_id?: number;

  /**
   * Fill this if you send message to chat
   */
  chat_id?: number;

  /**
   * If false, chat participants wouldn"t be notified, default: true
   */
  notify?: boolean;
}

export interface IMessagesAnswerCallbackParams {
  user_id?: number;

  /**
   * Fill this if you want to modify current message
   */
  message?: IParamsMessage | null;

  /**
   * Fill this if you just want to send one-time notification to user
   */
  notification?: string | null;
}

export interface ISubscriptionsSubscribeParams {
  /**
   * List of update types your bot want to receive. See Update object for a complete list of types
   */
  update_types?: Array<UpdateType>;

  /**
   * Version of API. Affects model representation
   */
  version?: string;
}

export interface ISubscriptionsGetUpdatesParams {
  /**
   * Maximim number of updates to be retrieved, from 1 to 1000, default: 100
   */
  limit?: number;

  /**
   * Timeout in seconds for long polling, from 0 to 90, default: 30
   */
  timeout?: number;

  /**
   * Identifier of first requested update. Pass null to get updates you didn"t get yet.
   */
  marker?: number | null;

  /**
   * List of update types your bot want to receive, example: ["message_created", "message_callback"]
   */
  types?: Array<UpdateType> | null;
}

export interface IAPIRequestParams {
  /**
   * API method
   */
  method: string;

  /**
   * HTTP method (e.g. POST)
   */
  httpMethod?: HttpMethod;

  /**
   * Query parameters
   */
  query?: any;

  /**
   * Body
   */
  body?: URLSearchParams;
}

export interface IMessageCallbackContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Callback
   */
  callback: ICallback;

  /**
   * Original message containing inline keyboard.
   * Can be `null` in case it had been deleted
   * by the moment a bot got this update.
   */
  message: IMessage;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IMessageCreatedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Newly created message
   */
  message: IMessage;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IMessageEditedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Edited message
   */
  message: IMessage;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IMessageRemovedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Identifier of removed message
   */
  message_id: string;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IUserAddedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Chat identifier where event has occured
   */
  chat_id: number;

  /**
   * User added to chat
   */
  user_id: number;

  /**
   * User who was added user to chat
   */
  inviter_id: number;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IUserRemovedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Chat identifier where event has occured
   */
  chat_id: number;

  /**
   * User who was removed from chat
   */
  user_id: number;

  /**
   * Administrator who removed user from chat
   */
  admin_id: number;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IBotStartedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Dialog identifier where event has occurred
   */
  chat_id: number;

  /**
   * User who pressed the "Start" button
   */
  user: IUser;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IBotAddedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Chat ID where bot was added
   */
  chat_id: number;

  /**
   * User ID who added bot to chat
   */
  user_id: number;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IBotRemovedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Chat identifier where bot was removed from
   */
  chat_id: number;

  /**
   * User ID who removed bot from chat
   */
  user_id: number;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IChatTitleChangedContext {
  /**
   * Update type
   */
  update_type: UpdateType;

  /**
   * Chat identifier where event has occurred
   */
  chat_id: number;

  /**
   * User who changed title
   */
  user_id: number;

  /**
   * New title
   */
  title: string;

  /**
   * Unix-time when event has occured
   */
  timestamp: number;
}

export interface IKeyboardCallbackButtonParams {
  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * Button payload
   */
  payload?: string;

  /**
   * Button intent
   */
  color?: ButtonColor;
}

export interface IKeyboardGeoButtonParams {
  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * If true, sends location without asking user"s confirmation
   */
  quick?: boolean;
}

export interface IKeyboardContactButtonParams {
  /**
   * Visible text of button, <= 128 characters
   */
  text: string;
}

export interface IKeyboardLinkButtonParams {
  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * URL, <= 256 characters
   */
  url: string;
}

export interface IAPICallParams {
  query: IPartial;

  body: IPartial;

  httpMethod?: HttpMethod;
}

export interface IChatsSendActionParams {
  chatId: number;

  action: Action;
}

export interface IChatsAddMembersParams {
  /**
   * Chat identifier
   */
  chatId: number;

  userIds: Array<number> | number;
}

export interface IChatsRemoveMemberParams {
  /**
   * Chat identifier
   */
  chatId: number;

  /**
   * User ID to remove from chat
   */
  userId: number;
}
