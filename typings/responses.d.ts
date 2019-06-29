import {
  ChatType,
  Attachment,
  IBotCommand,
  IMessage,
  IUser,
  ISubscription,
  ISuccess,
  Update,
} from "./interfaces";

type LinkType = "forward" | "reply";
type ChatStatus = "active" | "removed" | "left" | "closed" | "suspended";
type Permission = "read_all_messages" | "add_remove_members" | "add_admins"
  | "change_chat_info" | "pin_message" | "write";

interface IIcon {
  /**
   * URL of image
   */
  url: string;
}

interface IParticipants {
  [key: string]: number;
}

interface IChat {
  /**
   * Chats identifier
   */
  chat_id: number;

  /**
   * Type of chat. One of: dialog, chat, channel
   */
  type: ChatType;

  /**
   * Chat status. One of:
   *
   *  active: bot is active member of chat
   *
   *  removed: bot was kicked
   *
   *  left: bot intentionally left chat
   *
   *  closed: chat was closed
   */
  status: ChatStatus;

  /**
   * Visible title of chat. Can be null for dialogs
   */
  title?: string | null;

  /**
   * Icon of chat
   */
  icon?: IIcon | null;

  /**
   * Time of last event occured in chat
   */
  last_event_time: number;

  /**
   * Number of people in chat. Always 2 for dialog chat type
   */
  participants_count: number;

  /**
   * Identifier of chat owner. Visible only for chat admins
   */
  owner_id?: number | null;

  /**
   * Participants in chat with time of last activity.
   * Can be null when you request list of chats.
   * Visible for chat admins only
   */
  participants?: IParticipants | null;

  /**
   * Is current chat publicly available. Always false for dialogs
   */
  is_public: boolean;

  /**
   * Link on chat if it is public
   */
  link?: string | null;

  /**
   * Chat description
   */
  description?: string | null;
}

interface IChatMember {
  /**
   * Users identifier
   */
  user_id: number;

  /**
   * Users visible name
   */
  name: string;

  /**
   * Unique public user name. Can be null if user is not accessible or it is not set
   */
  username?: string | null;

  /**
   * URL of avatar
   */
  avatar_url?: string;

  /**
   * URL of avatar of a bigger size
   */
  full_avatar_url?: string;

  last_access_time: number;

  is_owner: boolean;

  is_admin: boolean;

  join_time: boolean;

  permissions?: Array<Permission> | null;
}

interface ILinkMessage {
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

export interface ILink {
  /**
   * Type of linked message
   */
  type: LinkType;

  /**
   * User sent this message
   */
  sender: IUser;

  /**
   * Chat where message was originally posted
   */
  chat_id: number;

  /**
   * Schema representing body of message
   */
  message: ILinkMessage;
}

export interface IBotsGetInfoResponse {
  /**
   * Users identifier
   */
  user_id: number;

  /**
   * Users visible name
   */
  name: string;

  /**
   * Unique public user name. Can be null if user is not accessible or it is not set
   */
  username?: string | null;

  /**
   * URL of avatar
   */
  avatar_url?: string;

  /**
   * URL of avatar of a bigger size
   */
  full_avatar_url?: string;

  /**
   * Commands supported by bot, <= 32 items
   */
  commands?: Array<IBotCommand> | null;

  /**
   * Bot description
   */
  description?: string | null;
}

export interface IBotsEditInfoResponse {
  /**
   * Users identifier
   */
  user_id: number;

  /**
   * Users visible name
   */
  name: string;

  /**
   * Unique public user name. Can be null if user is not accessible or it is not set
   */
  username?: string | null;

  /**
   * URL of avatar
   */
  avatar_url?: string;

  /**
   * URL of avatar of a bigger size
   */
  full_avatar_url?: string;

  /**
   * Commands supported by bot
   */
  commands?: Array<IBotCommand> | null;

  /**
   * Bot description
   */
  description?: string | null;
}

export type IChatsGetResponse = IChat;

export type IChatsEditResponse = IChat;

export interface IChatsGetChatsResponse {
  /**
   * List of requested chats
   */
  chats: Array<IChat>;

  /**
   * Reference to the next page of requested chats
   */
  marker?: number | null;
}

export type IChatsSendActionResponse = ISuccess;

export type IChatsGetChatMembershipResponse = IChatMember;

export type IChatsLeaveResponse = ISuccess;

export interface IChatsGetMembersResponse {
  /**
   * Participants in chat with time of last activity. Visible only for chat admins
   */
  members: Array<IChatMember>;

  /**
   * Pointer to the next data page
   */
  marker?: number | null;
}

export type IChatsAddMembersResponse = ISuccess;

export type IChatsRemoveMemberResponse = ISuccess;

export interface IMessagesGetResponse {
  /**
   * List of messages
   */
  messages: Array<IMessage>;
}

export interface IMessagesSendResponse {
  /**
   * Message in chat
   */
  message: IMessage;
}

export type IMessagesEditResponse = ISuccess;

export type IMessagesDeleteResponse = ISuccess;

export type IMessagesAnswerCallbackResponse = ISuccess;

export interface ISubscriptionsGetResponse {
  /**
   * Current suscriptions
   */
  subscriptions: Array<ISubscription>;
}

export type ISubscriptionsSubscribeResponse = ISuccess;

export type ISubscriptionsUnsubscribeResponse = ISuccess;

export interface ISubscriptionsGetUpdatesResponse {
  /**
   * Page of updates
   */
  updates: Array<Update>;

  /**
   * Pointer to the next data page
   */
  marker: number;
}

export interface IUploadGetUrlResponse {
  /**
   * URL to upload
   */
  url: string;
}
