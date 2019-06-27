import API from "../components/api";
import ChainKeyboard from "../lib/chainkeyboard";
import Keyboard from "../lib/keyboard";
import * as Params from "./params";
import Updates from "../components/updates";

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
