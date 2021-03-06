import Context from "./context";

import TamTam from "../components/tamtam";

import {
  IMessageCreatedContext,
  UpdateType,
  IMessagesSendParams,
} from "../../typings/params";

import {
  Attachment,
  IUser,
  IMessageRecipient,
  IMessageBody,
  ChatType,
  AttachmentType,
  IMessageStat,
} from "../../typings/interfaces";
import { ILink } from "../../typings/responses";

declare class MessageCreatedContext extends Context {
  public id: string;

  public text?: string | null;

  public senderId: number;

  public chatId?: number | null;

  public chatType?: ChatType | null;

  public attachments?: Array<Attachment> | null;

  public sender?: IUser | null;

  public recipient: IMessageRecipient;

  public timestamp: number;

  public link?: ILink | null;

  public stat?: IMessageStat | null;

  public body: IMessageBody;

  public isChat: boolean;

  public isDialog: boolean;

  public isChannel: boolean;

  public match?: RegExpMatchArray | null;

  constructor(tamtam: TamTam, payload: IMessageCreatedContext);

  public hasAttachments(type?: AttachmentType): boolean;

  public getAttachments(type?: AttachmentType): Array<Attachment>;

  public is(types: UpdateType | Array<UpdateType>): boolean;

  public send(text: string, params?: IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: IMessagesSendParams): Promise<void>;

  public forward(text: string, params?: IMessagesSendParams): Promise<void>;
}

export = MessageCreatedContext;
