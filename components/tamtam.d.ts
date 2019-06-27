import * as Params from '../typings/params';
import API from './api';
import Updates from './updates';

declare class TamTam {
  constructor(params: Params.ITamTamParams);

  api: API;
  updates: Updates;
}

export = TamTam;
