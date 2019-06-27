import * as Params from '../typings/params';
import API from './api';
import Updates from './updates';

declare class TamTam {
  public api: API;
  public updates: Updates;

  constructor(params: Params.ITamTamParams);
}

export = TamTam;
