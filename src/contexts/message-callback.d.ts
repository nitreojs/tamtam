import Context from "./context";

import TamTam from "../components/tamtam";

import {
  UpdateType,
  IMessageCallbackContext,
  IMessagesSendParams,
} from "../../typings/params";

import { IMessagesAnswerCallbackResponse } from "../../typings/responses";

declare class MessageCallbackContext extends Context {
  constructor(tamtam: TamTam, payload: IMessageCallbackContext);

  public is(types: UpdateType | Array<UpdateType>): boolean;

  public send(text: string, params?: IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: IMessagesSendParams): Promise<void>;

  public sendNotification(text: string): Promise<IMessagesAnswerCallbackResponse>;
}

export = MessageCallbackContext;
