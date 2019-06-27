import API from "./api";
import * as Params from "../typings/params";
import * as Responses from "../typings/responses";

declare class Bots {
  private api: API;

  constructor(api: API);

  public getInfo(): Promise<Responses.IBotsGetInfoResponse>;

  public editInfo(params: Params.IBotsEditInfoParams): Promise<Responses.IBotsEditInfoResponse>;
}

export = Bots;
