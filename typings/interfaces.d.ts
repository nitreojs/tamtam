import * as Params from "./params";
import * as Responses from "./responses";
import { UpdateType, IMessagesSendParams } from "./params";

type LinkType = "forward" | "reply";
type ButtonIntent = "positive" | "negative" | "default";

export interface IPhotoToken {
  [key: string]: IPhotoTokenParams;
}

interface IPhotoTokenParams {
  /**
   * Encoded information of uploaded image
   */
  token: string;
}

export interface IBotCommand {
  /**
   * Command name, from 1 to 64 characters
   */
  name: string;

  /**
   * Command description, from 1 to 128 characters
   */
  description?: string | null;
}

interface IButtonCallback {
  type: "callback";

  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * Button payload, <= 1024 characters
   */
  payload?: string;

  /**
   * Intent of button. Affects clients representation, default: "default"
   */
  color?: ButtonIntent;
}

interface IButtonLink {
  type: "link";

  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * <= 256 characters
   */
  url: string;
}

interface IButtonRequestContact {
  type: "request_contact";

  /**
   * Visible text of button, <= 128 characters
   */
  text: string;
}

interface IButtonRequestGeoLocation {
  type: "request_geo_location";

  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * If true, sends location without asking user"s confirmation, default: false
   */
  quick?: boolean;
}

interface IAttachmentImage {
  type: "image";

  payload: IPhoto;
}

interface IAttachmentVideo {
  type: "video";

  payload: IAttachmentVideoPayload;
}

interface IAttachmentVideoPayload {
  /**
   * Use `token` in case when you are trying to reuse the same attachment in other message
   */
  token: string;
}

interface IAttachmentAudio {
  type: "audio";

  payload: IAttachmentAudioPayload;
}

interface IAttachmentAudioPayload {
  /**
   * Use `token` in case when you are trying to reuse the same attachment in other message
   */
  token: string;
}

interface IAttachmentFile {
  type: "file";

  payload: IAttachmentFilePayload;
}

interface IAttachmentFilePayload {
  /**
   * Uploaded file name
   */
  size: number;

  /**
   * File size in bytes
   */
  filename: string;

  /**
   * File url
   */
  url: string;

  /**
   * File identifier
   */
  id: number;

  /**
   * Token is unique uploaded media identifier
   */
  token: string;
}

interface IAttachmentContact {
  type: "contact";

  payload: IAttachmentContactPayload;
}

interface IAttachmentContactPayload {
  /**
   * Contact name
   */
  name?: string | null;

  /**
   * Contact identifier
   */
  contactId?: number | null;

  /**
   * Full information about contact in VCF format
   */
  vcfInfo?: string | null;

  /**
   * Contact phone in VCF format
   */
  vcfPhone?: string | null;

  tamInfo?: IUser;
}

interface IAttachmentSticker {
  type: "sticker";

  /**
   * Sticker wigth
   */
  width: number;

  /**
   * Sticker height
   */
  height: number;

  payload: IAttachmentStickerPayload;
}

interface IAttachmentStickerPayload {
  /**
   * Sticker code
   */
  code: string;

  /**
   * Sticker URL
   */
  url: string;
}

interface IAttachmentInlineKeyboard {
  type: "inline_keyboard";

  payload: IAttachmentInlineKeyboardPayload;
}

interface IAttachmentInlineKeyboardPayload {
  /**
   * Two-dimensional array of buttons
   */
  buttons: Array<Array<Button>>;
}

// interface IAttachmentShare {
//   type: "share";

//   payload: IAttachmentSharePayload;
// }

// interface IAttachmentSharePayload {
//   /**
//    * Media attachment URL
//    */
//   url: string;
// }

interface IUser {
  /**
   * Users identifier
   */
  id: number;

  /**
   * Users visible name
   */
  name: string;

  /**
   * Unique public user name. Can be null if user is not accessible or it is not set
   */
  username?: string | null;
}

interface IMessageRecipient {
  /**
   * Chat identifier
   */
  chatId?: number | null;

  /**
   * Chat type
   */
  chatType: ChatType;

  /**
   * User identifier, if message was sent to user
   */
  userId?: number | null;
}

interface IMessageBody {
  /**
   * Unique identifier of message
   */
  mid: string;

  /**
   * Sequence identifier of message in chat
   */
  seq: number;

  /**
   * Message text
   */
  text?: string | null;

  /**
   * Message attachments. Could be one of Attachment type. See description of this schema
   */
  attachments?: Array<Attachment> | null;
}

interface IMessageStat {
  views: number;
}

interface IUpdateMessageCallbackCallback {
  /**
   * Unix-time when user pressed the button
   */
  timestamp: number;

  /**
   * Current keyboard identifier
   */
  callback_id: string;

  /**
   * Button payload
   */
  payload?: string;

  /**
   * User who pressed the button
   */
  user: IUser;
}

interface IUpdateMessageCallback {
  update_type: "message_callback";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  callback: IUpdateMessageCallbackCallback;

  /**
   * Original message containing inline keyboard.
   * Can be null in case it had been deleted by the moment a bot
   * got this update
   */
  message?: IMessage | null;
}

interface IUpdateMessageCreated {
  update_type: "message_created";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Newly created message
   */
  message: IMessage;
}

interface IUpdateMessageRemoved {
  update_type: "message_removed";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Identifier of removed message
   */
  message_id: string;
}

interface IUpdateMessageEdited {
  update_type: "message_edited";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Edited message
   */
  message: IMessage;
}

interface IUpdateBotAdded {
  update_type: "bot_added";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Chat id where bot was added
   */
  chat_id: number;

  /**
   * User id who added bot to chat
   */
  user_id: number;
}

interface IUpdateBotRemoved {
  update_type: "bot_removed";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Chat identifier bot removed from
   */
  chat_id: number;

  /**
   * User id who removed bot from chat
   */
  user_id: number;
}

interface IUpdateUserAdded {
  update_type: "user_added";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Chat identifier where event has occured
   */
  chat_id: number;

  /**
   * User added to chat
   */
  user_id: number;

  /**
   * User who added user to chat
   */
  inviter_id: number;
}

interface IUpdateUserRemoved {
  update_type: "user_removed";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Chat identifier where event has occured
   */
  chat_id: number;

  /**
   * User removed from chat
   */
  user_id: number;

  /**
   * Administrator who removed user from chat.
   * Can be `null` in case when user left chat
   */
  admin_id?: number | null;
}

interface IUpdateBotStarted {
  update_type: "bot_started";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Dialog identifier where event has occurred
   */
  chat_id: number;

  /**
   * User pressed the "Start" button
   */
  user: IUser;
}

interface IUpdateChatTitleChanged {
  update_type: "chat_title_changed";

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Chat identifier where event has occurred
   */
  chat_id: number;

  /**
   * User who changed title
   */
  user: IUser;

  /**
   * New title
   */
  title: string;
}

interface IMessageCallback {
  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Callback ID
   */
  id: string;

  /**
   * User who called the callback
   */
  user: IUser;

  /**
   * Button payload
   */
  payload?: string | null;
}

export interface IPhoto {
  /**
   * Any external image URL you want to attach
   */
  url?: string | null;

  /**
   * Token of any existing attachment
   */
  token?: string | null;

  /**
   * Photo identifier
   */
  id: number;
}

export interface ILink {
  /**
   * Type of message link
   */
  type: LinkType;

  /**
   * Message identifier of original message
   */
  mid: string;
}

export interface IParamsMessage {
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

export interface ISuccess {
  /**
   * true if request was successful. false otherwise
   */
  success: boolean;

  /**
   * Explanatory message if the result is not successful
   */
  message: string;
}

export interface ISubscription {
  /**
   * Webhook URL
   */
  url?: string;

  /**
   * Unix-time when subscription was created
   */
  time?: number;

  /**
   * Update types bot subscribed for
   */
  update_types?: Array<Params.UpdateType>;

  /**
   * API version
   */
  version?: string;
}

export interface IMessage {
  /**
   * User who sent this message.
   * Can be `null` if message has been posted on behalf of a channel
   */
  sender?: IUser | null;

  /**
   * Message recipient. Could be user or chat
   */
  recipient: IMessageRecipient;

  /**
   * Unix-time when message was created
   */
  timestamp: number;

  /**
   * Forwarder or replied message
   */
  link?: ILink | null;

  /**
   * Body of created message.
   * Text + attachments. Could be `null` if message contains only forwarded message
   */
  body?: IMessageBody | null;

  /**
   * Message staistics.
   * Available only for channels in GET:/messages context
   */
  stat?: IMessageStat | null;

  /**
   * Message public URL.
   * Can be `null` for dialogs or non-public chats/channels
   */
  url?: string | null;
}

export interface IMessageCreatedContext {
  /**
   * Message identifier
   */
  id: string;

  /**
   * Message text
   */
  text?: string | null;

  /**
   * Sender identifier
   */
  senderId: number;

  /**
   * Chat identifier
   */
  chatId?: number | null;

  /**
   * Chat type
   */
  chatType?: ChatType | null;

  /**
   * Message body attachments
   */
  attachments?: Array<Attachment> | null;

  /**
   * User that sent this message. Can be null if message has been posted on behalf of a channel
   */
  sender?: IUser | null;

  /**
   * Message recipient. Could be user or chat
   */
  recipient: IMessageRecipient;

  /**
   * Unix-time when message was created
   */
  timestamp: number;

  /**
   * Forwarder or replied message
   */
  link?: ILink | null;

  /**
   * Body of created message. Text + attachments. Could be null if message contains only forwarded message
   */
  body: IMessageBody;

  /**
   * Is message sent to chat?
   */
  isChat: boolean;

  /**
   * Is message sent to dialog?
   */
  isDialog: boolean;

  /**
   * Is message sent to channel?
   */
  isChannel: boolean;

  /**
   * Message staistics. Available only for channels in GET:/messages context
   */
  stat?: IMessageStat | null;

  /**
   * Appends when matching RegExp from `hear` method
   */
  match?: RegExpMatchArray | null;

  /**
   * Send message to the chat where message was created
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  /**
   * Reply to the created message
   */
  reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  /**
   * Do message have selected attachments?
   */
  hasAttachments(type?: AttachmentType): boolean;

  /**
   * Get attachments with pointed type
   */
  getAttachments(type?: AttachmentType): Array<Attachment>;

  is(types: UpdateType | Array<UpdateType>): boolean;

  /**
   * Send message to the current chat/dialog/channel
   */
  send(text: string, params?: IMessagesSendParams): Promise<void>;

  /**
   * Reply to the sent message
   */
  reply(text: string, params?: IMessagesSendParams): Promise<void>;

  /**
   * Forward the sent message
   */
  forward(text: string, params?: IMessagesSendParams): Promise<void>;
}

export interface IMessageCallbackContext {
  /**
   * Message identifier
   */
  id: string;

  /**
   * Message text
   */
  text?: string | null;

  /**
   * Sender identifier
   */
  senderId: number;

  /**
   * Chat identifier
   */
  chatId?: number | null;

  /**
   * Chat type
   */
  chatType?: ChatType | null;

  /**
   * Message body attachments
   */
  attachments?: Array<Attachment> | null;

  /**
   * User that sent this message. Can be null if message has been posted on behalf of a channel
   */
  sender?: IUser | null;

  /**
   * Message recipient. Could be user or chat
   */
  recipient: IMessageRecipient;

  /**
   * Callback
   */
  callback: IMessageCallback;

  /**
   * Unix-time when message was created
   */
  timestamp: number;

  /**
   * Forwarder or replied message
   */
  link?: ILink | null;

  /**
   * Body of created message. Text + attachments. Could be null if message contains only forwarded message
   */
  body: IMessageBody;

  /**
   * Is message sent to chat?
   */
  isChat: boolean;

  /**
   * Is message sent to dialog?
   */
  isDialog: boolean;

  /**
   * Is message sent to channel?
   */
  isChannel: boolean;

  /**
   * Message staistics. Available only for channels in GET:/messages context
   */
  stat?: IMessageStat | null;

  /**
   * Send message to the chat where callback was called
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  /**
   * Reply to the sent message
   */
  reply(text: string, params?: IMessagesSendParams): Promise<void>;

  /**
   * Forward the sent message
   */
  forward(text: string, params?: IMessagesSendParams): Promise<void>;

  /**
   * Send one-time notification to user
   */
  sendNotification(text: string): Promise<Responses.IMessagesAnswerCallbackResponse>;
}

export interface IChatTitleChangedContext {
  /**
   * Chat identifier
   */
  chatId: number;

  /**
   * Users identifier
   */
  user: IUser;

  /**
   * New title
   */
  title: string;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the chat where title was changed
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  is(types: UpdateType | Array<UpdateType>): boolean;
}

export interface IMessageEditedContext {
  /**
   * Edited message
   */
  message: IMessage;

  /**
   * Message identifier
   */
  id: string;

  /**
   * Message text
   */
  text?: string | null;

  /**
   * Sender identifier
   */
  senderId: number;

  /**
   * Chat identifier
   */
  chatId?: number | null;

  /**
   * Chat type
   */
  chatType?: ChatType | null;

  /**
   * Message body attachments
   */
  attachments?: Array<Attachment> | null;

  /**
   * User that sent this message. Can be null if message has been posted on behalf of a channel
   */
  sender?: IUser | null;

  /**
   * Message recipient. Could be user or chat
   */
  recipient: IMessageRecipient;

  /**
   * Unix-time when message was created
   */
  timestamp: number;

  /**
   * Forwarder or replied message
   */
  link?: ILink | null;

  /**
   * Body of created message. Text + attachments. Could be null if message contains only forwarded message
   */
  body: IMessageBody;

  /**
   * Is message sent to chat?
   */
  isChat: boolean;

  /**
   * Is message sent to dialog?
   */
  isDialog: boolean;

  /**
   * Is message sent to channel?
   */
  isChannel: boolean;

  /**
   * Message staistics. Available only for channels in GET:/messages context
   */
  stat?: IMessageStat | null;

  /**
   * Send message to the chat where message was created
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  /**
   * Reply to the created message
   */
  reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  /**
   * Do message have selected attachments?
   */
  hasAttachments(type?: AttachmentType): boolean;

  /**
   * Get attachments with pointed type
   */
  getAttachments(type?: AttachmentType): Array<Attachment>;

  is(types: UpdateType | Array<UpdateType>): boolean;

  /**
   * Send message to the current chat/dialog/channel
   */
  send(text: string, params?: IMessagesSendParams): Promise<void>;

  /**
   * Reply to the sent message
   */
  reply(text: string, params?: IMessagesSendParams): Promise<void>;

  /**
   * Forward the sent message
   */
  forward(text: string, params?: IMessagesSendParams): Promise<void>;
}

export interface IMessageRemovedContext {
  /**
   * Message identifier
   */
  messageId: string;

  /**
   * Timestamp
   */
  timestamp: number;

  is(types: UpdateType | Array<UpdateType>): boolean;
}

export interface IUserAddedContext {
  /**
   * Chat identifier where event has occured
   */
  chatId: number;

  /**
   * User who was added to chat
   */
  user: IUser;

  /**
   * User who added user to chat
   */
  inviterId: number;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the chat where user was added
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  is(types: UpdateType | Array<UpdateType>): boolean;
}

export interface IUserRemovedContext {
  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Chat identifier where event has occured
   */
  chatId: number;

  /**
   * User who was removed from chat
   */
  user: IUser;

  /**
   * Administrator who removed user from chat
   */
  adminId: number;

  /**
   * Send message to the chat where user was removed
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  is(types: UpdateType | Array<UpdateType>): boolean;
}

export interface IBotStartedContext {
  /**
   * Dialog identifier where event has occurred
   */
  chatId: number;

  /**
   * User who pressed the "Start" button
   */
  user: IUser;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the user who pressed the "Start" button
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  is(types: UpdateType | Array<UpdateType>): boolean;
}

export interface IBotAddedContext {
  /**
   * Chat ID where bot was added
   */
  chatId: number;

  /**
   * User who added bot to chat
   */
  user: IUser;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the chat where bot was added
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  is(types: UpdateType | Array<UpdateType>): boolean;
}

export interface IBotRemovedContext {
  /**
   * Chat identifier bot removed from
   */
  chatId: number;

  /**
   * User who removed bot from chat
   */
  user: IUser;

  /**
   * Timestamp
   */
  timestamp: number;

  is(types: UpdateType | Array<UpdateType>): boolean;
}

export type AttachmentType = "audio" | "video" | "file"
  | "image" | "contact" | "sticker"
  | "share" | "location" | "inline_keyboard";
export type ChatType = "dialog" | "chat" | "channel";
export type Button = IButtonCallback | IButtonLink | IButtonRequestContact | IButtonRequestGeoLocation;
export type Context = IMessageCreatedContext | IMessageEditedContext | IMessageRemovedContext
  | IMessageCallbackContext | IChatTitleChangedContext | IUserAddedContext
  | IUserRemovedContext | IBotStartedContext | IBotAddedContext
  | IBotRemovedContext;
export type Attachment = IAttachmentAudio | IAttachmentContact | IAttachmentFile
  | IAttachmentImage | IAttachmentInlineKeyboard | IAttachmentSticker
  | IAttachmentVideo;
export type Update = IUpdateMessageCallback | IUpdateMessageCreated | IUpdateMessageRemoved
  | IUpdateMessageEdited | IUpdateBotAdded | IUpdateBotRemoved
  | IUpdateUserAdded | IUpdateUserRemoved | IUpdateBotStarted
  | IUpdateChatTitleChanged;
