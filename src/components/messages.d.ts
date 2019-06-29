import API from "./api";

import {
  IMessagesGetParams,
  IMessagesSendParams,
  IMessagesEditParams,
  IMessagesAnswerCallbackParams,
} from "../../typings/params";

import {
  IMessagesGetResponse,
  IMessagesSendResponse,
  IMessagesEditResponse,
  IMessagesDeleteResponse,
  IMessagesAnswerCallbackResponse,
} from "../../typings/responses";

export default class Messages {
  private api: API;

  constructor(tamtam: API);

  public get(params?: IMessagesGetParams): Promise<IMessagesGetResponse>;

  public send(params: IMessagesSendParams): Promise<IMessagesSendResponse>;

  public edit(messageId: string, params: IMessagesEditParams): Promise<IMessagesEditResponse>;

  public delete(messageId: number): Promise<IMessagesDeleteResponse>;

  public answerCallback(callbackId: number, params?: IMessagesAnswerCallbackParams): Promise<
    IMessagesAnswerCallbackResponse
  >;
}
