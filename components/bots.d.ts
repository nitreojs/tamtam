import * as Params from '../typings/params';
import * as Responses from '../typings/responses';
import API from './api';

declare class Bots {
  constructor(api: API);

  private api: API;

  getInfo(): Promise<Responses.IBotsGetInfoResponse>;

  editInfo(params: Params.IBotsEditInfoParams): Promise<Responses.IBotsEditInfoResponse>;
}

export = Bots;
