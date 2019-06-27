import * as Params from './params';
import * as Responses from './responses';

type ILinkType = 'forward' | 'reply';
type IButtonIntent = 'positive' | 'negative' | 'default';

interface PhotoToken {
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
  type: 'callback';

  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * Button payload, <= 1024 characters
   */
  payload?: string;

  /**
   * Intent of button. Affects clients representation, default: 'default'
   */
  intent?: IButtonIntent;
}

interface IButtonLink {
  type: 'link';

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
  type: 'request_contact';

  /**
   * Visible text of button, <= 128 characters
   */
  text: string;
}

interface IButtonRequestGeoLocation {
  type: 'request_geo_location';

  /**
   * Visible text of button, <= 128 characters
   */
  text: string;

  /**
   * If true, sends location without asking user's confirmation, default: false
   */
  quick?: boolean;
}

interface IAttachmentImage {
  type: 'image';

  payload: IPhoto;
}

interface IAttachmentVideo {
  type: 'video';

  payload: IAttachmentVideoPayload;
}

interface IAttachmentVideoPayload {
  id: number;
}

interface IAttachmentAudio {
  type: 'audio';

  payload: IAttachmentAudioPayload;
}

interface IAttachmentAudioPayload {
  id: number;
}

interface IAttachmentFile {
  type: 'file';

  payload: IAttachmentFilePayload;
}

interface IAttachmentFilePayload {
  fileId: number;
}

interface IAttachmentContact {
  type: 'contact';

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
}

interface IAttachmentSticker {
  type: 'sticker';

  payload: IAttachmentStickerPayload;
}

interface IAttachmentStickerPayload {
  /**
   * Sticker code
   */
  code: string;
}

interface IAttachmentInlineKeyboard {
  type: 'inline_keyboard';

  payload: IAttachmentInlineKeyboardPayload;
}

interface IAttachmentInlineKeyboardPayload {
  /**
   * Two-dimensional array of buttons
   */
  buttons: Array<Array<IButton>>;
}

interface IMessageSender {
  /**
   * Users identifier
   */
  userId: number;

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
  attachments?: Array<IAttachment> | null;
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
  user: IMessageSender;
}

interface IUpdateMessageCallback {
  update_type: 'message_callback';

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  callback: IUpdateMessageCallbackCallback;

  /**
   * Original message containing inline keyboard. Can be null in case it had been deleted by the moment a bot got this update
   */
  message?: IMessage | null;
}

interface IUpdateMessageCreated {
  update_type: 'message_created';

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
  update_type: 'message_removed';

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
  update_type: 'message_edited';

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
  update_type: 'bot_added';

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
  update_type: 'bot_removed';

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
  update_type: 'user_added';

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
  update_type: 'user_removed';

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
   * Administrator who removed user from chat
   */
  admin_id: number;
}

interface IUpdateBotStarted {
  update_type: 'bot_started';

  /**
   * Unix-time when event has occured
   */
  timestamp: number;

  /**
   * Dialog identifier where event has occurred
   */
  chat_id: number;

  /**
   * User pressed the 'Start' button
   */
  user_id: number;
}

interface IUpdateChatTitleChanged {
  update_type: 'chat_title_changed';

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
  user_id: number;

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
  callbackId: string;

  /**
   * User who called the callback
   */
  user: IMessageSender;
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
   * Tokens were obtained after uploading images
   */
  photos?: PhotoToken | null;
}

export interface ILink {
  /**
   * Type of message link
   */
  type: ILinkType;

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
   * Message attachments. See AttachmentRequest and it's inheritors for full information.
   */
  attachments?: Array<IAttachment> | null;

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
   * If false, chat participants wouldn't be notified, default: true
   */
  notify?: boolean;
}

export interface ISuccess {
  /**
   * true if request was successful. false otherwise
   */
  success: boolean;
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
   * User that sent this message. Can be null if message has been posted on behalf of a channel
   */
  sender?: IMessageSender;

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
   * Message staistics. Available only for channels in GET:/messages context
   */
  stat?: IMessageStat | null;
}

export interface IMessageCreatedContext {
  /**
   * Message text
   */
  text?: string | null;

  /**
   * User that sent this message. Can be null if message has been posted on behalf of a channel
   */
  sender?: IMessageSender;

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
}

export interface IMessageCallbackContext {
  /**
   * Message ID
   */
  id: string;

  /**
   * User that sent this message. Can be null if message has been posted on behalf of a channel
   */
  sender: IMessageSender;

  /**
   * Message recipient. Could be user or chat
   */
  recipient: IMessageRecipient;

  /**
   * Callback
   */
  callback: IMessageCallback;

  /**
   * Body of created message. Text + attachments. Could be null if message contains only forwarded message
   */
  body: IMessageBody;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the chat where callback was called
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

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
  userId: number;

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
}

export interface IMessageEditedContext {
  /**
   * Edited message
   */
  message: IMessage;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the chat where message was edited
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  /**
   * Reply to the edited message
   */
  reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;
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
}

export interface IUserAddedContext {
  /**
   * Chat identifier where event has occured
   */
  chatId: number;

  /**
   * User added to chat
   */
  userId: number;

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
   * User removed from chat
   */
  userId: number;

  /**
   * Administrator who removed user from chat
   */
  adminId: number;

  /**
   * Send message to the chat where user was removed
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

export interface IBotStartedContext {
  /**
   * Dialog identifier where event has occurred
   */
  chatId: number;

  /**
   * User who pressed the 'Start' button
   */
  userId: number;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the user who pressed the 'Start' button
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

export interface IBotAddedContext {
  /**
   * Chat ID where bot was added
   */
  chatId: number;

  /**
   * User ID who was added bot to chat
   */
  userId: number;

  /**
   * Timestamp
   */
  timestamp: number;

  /**
   * Send message to the chat where bot was added
   */
  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

export interface IBotRemovedContext {
  /**
   * Chat identifier bot removed from
   */
  chatId: number;

  /**
   * User ID who removed bot from chat
   */
  userId: number;

  /**
   * Timestamp
   */
  timestamp: number;
}

export type ChatType = 'dialog' | 'chat' | 'channel';
export type IButton = IButtonCallback | IButtonLink | IButtonRequestContact | IButtonRequestGeoLocation;
export type Context = IMessageCreatedContext | IMessageCallbackContext | IChatTitleChangedContext | IMessageEditedContext | IUserAddedContext | IMessageRemovedContext | IBotStartedContext;
export type IAttachment = IAttachmentAudio | IAttachmentContact | IAttachmentFile | IAttachmentImage | IAttachmentInlineKeyboard | IAttachmentSticker | IAttachmentVideo;
export type IUpdate = IUpdateMessageCallback | IUpdateMessageCreated | IUpdateMessageRemoved | IUpdateMessageEdited | IUpdateBotAdded | IUpdateBotRemoved | IUpdateUserAdded | IUpdateUserRemoved | IUpdateBotStarted | IUpdateChatTitleChanged;
