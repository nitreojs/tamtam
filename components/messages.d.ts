import API from "./api";
import * as Params from "../typings/params";
import * as Responses from "../typings/responses";

export default class Messages {
  private api: API;

  constructor(tamtam: API);

  public get(params?: Params.IMessagesGetParams): Promise<Responses.IMessagesGetResponse>;

  public send(params: Params.IMessagesSendParams): Promise<Responses.IMessagesSendResponse>;

  public edit(messageId: string, params: Params.IMessagesEditParams): Promise<Responses.IMessagesEditResponse>;

  public delete(messageId: number): Promise<Responses.IMessagesDeleteResponse>;

  public answerCallback(callbackId: number, params: Params.IMessagesAnswerCallbackParams): Promise<Responses.IMessagesAnswerCallbackResponse>;
}
