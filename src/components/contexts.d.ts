import * as Params from "../../typings/params";
import * as Responses from "../../typings/responses";
import TamTam from "./tamtam";
import { Attachment, IUser, IMessageRecipient, IMessageBody, ChatType, AttachmentType, IMessage } from "../../typings/interfaces";

declare class Context {
  constructor(tamtam: TamTam, type: string);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;
}

declare class MessageCallbackContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageCallbackContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public sendNotification(text: string): Promise<Responses.IMessagesAnswerCallbackResponse>;
}

declare class MessageCreatedContext extends Context {
  public id: string;

  public text: string;

  public senderId: number;

  public chatId: number | null;

  public chatType: ChatType | null;

  public attachments: Array<Attachment> | null;

  public sender: IUser;

  public recipient: IMessageRecipient;

  public timestamp: number;

  public body: IMessageBody;

  public isChat: boolean;

  public isDialog: boolean;

  public isChannel: boolean;

  constructor(tamtam: TamTam, payload: Params.IMessageCreatedContext);

  hasAttachments(type?: AttachmentType): boolean;

  getAttachments(type?: AttachmentType): Array<Attachment>;

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class MessageEditedContext extends Context {
  public message: IMessage;

  public id: string;

  public text: string;

  public senderId: number;

  public chatId: number | null;

  public chatType: ChatType | null;

  public attachments: Array<Attachment> | null;

  public sender: IUser;

  public recipient: IMessageRecipient;

  public timestamp: number;

  public body: IMessageBody;

  public isChat: boolean;

  public isDialog: boolean;

  public isChannel: boolean;

  constructor(tamtam: TamTam, payload: Params.IMessageEditedContext);

  hasAttachments(type?: AttachmentType): boolean;

  getAttachments(type?: AttachmentType): Array<Attachment>;

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class MessageRemovedContext extends Context {
  public messageId: string;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: Params.IMessageRemovedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;
}

declare class UserAddedContext extends Context {
  public chatId: number;

  public user: IUser;

  public inviterId: number;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: Params.IUserAddedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class UserRemovedContext extends Context {
  public chatId: number;

  public user: IUser;

  public adminId: number;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: Params.IUserRemovedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotStartedContext extends Context {
  public chatId: number;

  public user: IUser;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: Params.IBotStartedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotAddedContext extends Context {
  public chatId: number;

  public user: IUser;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: Params.IBotAddedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotRemovedContext extends Context {
  public chatId: number;

  public user: IUser;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: Params.IBotRemovedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class ChatTitleChanged extends Context {
  public chatId: number;

  public user: IUser;

  public title: string;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: Params.IChatTitleChangedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

export {
  BotStartedContext,
  BotAddedContext,
  BotRemovedContext,
  ChatTitleChanged,
  Context,
  MessageCallbackContext,
  MessageCreatedContext,
  MessageEditedContext,
  MessageRemovedContext,
  UserAddedContext,
  UserRemovedContext,
};
