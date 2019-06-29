import Bots from "./bots";
import Chats from "./chats";
import Messages from "./messages";
import Subscriptions from "./subscriptions";
import Upload from "./upload";

import {
  ITamTamParams,
  IAPIRequestParams,
  IAPICallParams,
} from "../../typings/params";

/**
 * API
 */
declare class API {
  public bots: Bots;
  public chats: Chats;
  public messages: Messages;
  public subscriptions: Subscriptions;
  public upload: Upload;

  constructor(tamtam: ITamTamParams);

  public request(params: IAPIRequestParams): Promise<any>;

  public call(method: string, params: IAPICallParams): Promise<any>;
}

export = API;
