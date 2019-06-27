import * as Params from "../typings/params";
import Bots from "./bots";
import Chats from "./chats";
import Messages from "./messages";
import Subscriptions from "./subscriptions";
import Upload from "./upload";

/**
 * API
 */
declare class API {
  public bots: Bots;
  public chats: Chats;
  public messages: Messages;
  public subscriptions: Subscriptions;
  public upload: Upload;

  constructor(tamtam: Params.ITamTamParams);

  public request(params: Params.IAPIRequestParams): Promise<any>;

  public call(method: string, params: Params.IAPICallParams): Promise<any>;
}

export = API;
