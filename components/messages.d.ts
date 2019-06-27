import * as Params from '../typings/params';
import * as Responses from '../typings/responses';
import API from './api';

export default class Messages {
  constructor(tamtam: API);

  private api: API;

  get(params?: Params.IMessagesGetParams): Promise<Responses.IMessagesGetResponse>;

  send(params: Params.IMessagesSendParams): Promise<Responses.IMessagesSendResponse>;

  edit(messageId: string, params: Params.IMessagesEditParams): Promise<Responses.IMessagesEditResponse>;

  delete(messageId: number): Promise<Responses.IMessagesDeleteResponse>;

  answerCallback(callbackId: number, params: Params.IMessagesAnswerCallbackParams): Promise<Responses.IMessagesAnswerCallbackResponse>;
}
