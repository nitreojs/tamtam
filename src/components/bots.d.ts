import API from "./api";
import { IBotsEditInfoParams } from "../../typings/params";
import { IBotsGetInfoResponse, IBotsEditInfoResponse } from "../../typings/responses";

declare class Bots {
  private api: API;

  constructor(api: API);

  public getInfo(): Promise<IBotsGetInfoResponse>;

  public editInfo(params: IBotsEditInfoParams): Promise<IBotsEditInfoResponse>;
}

export = Bots;
