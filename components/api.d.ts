import * as Params from '../typings/params';
import Bots from './bots';
import Chats from './chats';
import Messages from './messages';
import Subscriptions from './subscriptions';
import Upload from './upload';

/**
 * API
 */
declare class API {
  constructor(tamtam: Params.ITamTamParams);

  bots: Bots;
  chats: Chats;
  messages: Messages;
  subscriptions: Subscriptions;
  upload: Upload;

  request(params: Params.IAPIRequestParams): Promise<any>;

  call(method: string, params: Params.IAPICallParams): Promise<any>;
}

export = API;
