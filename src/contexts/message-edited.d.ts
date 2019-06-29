import Context from "./context";

import TamTam from "../components/tamtam";

import {
  UpdateType,
  IMessageCallbackContext,
  IMessagesSendParams,
  IMessageEditedContext,
} from "../../typings/params";

import * as Responses from "../../typings/responses";

import {
  Attachment,
  IUser,
  IMessageRecipient,
  IMessageBody,
  ChatType,
  AttachmentType,
  IMessage,
} from "../../typings/interfaces";

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

  constructor(tamtam: TamTam, payload: IMessageEditedContext);

  public hasAttachments(type?: AttachmentType): boolean;

  public getAttachments(type?: AttachmentType): Array<Attachment>;

  public is(types: UpdateType | Array<UpdateType>): boolean;

  public send(text: string, params?: IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: IMessagesSendParams): Promise<void>;
}

export = MessageEditedContext;
