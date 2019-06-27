import * as Params from './params';
import API from '../components/api';
import Updates from '../components/updates';
import Keyboard from '../lib/keyboard';
import ChainKeyboard from '../lib/chainkeyboard';

declare class TamTam {
  constructor(params: Params.ITamTamParams);

  public api: API;
  public updates: Updates;
}

export {
  TamTam,
  Keyboard,
  ChainKeyboard,
};

export default TamTam;
