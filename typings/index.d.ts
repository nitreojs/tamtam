import * as Params from "./params";
import API from "./components/api";
import ChainKeyboard from "./chain-keyboard";
import Keyboard from "./keyboard";
import Markdown from "./markdown";
import Updates from "./components/updates";

declare class TamTam {
  public api: API;
  public updates: Updates;

  constructor(params: Params.ITamTamParams);
}

export {
  TamTam,
  Keyboard,
  ChainKeyboard,
  Markdown,
};

export default TamTam;
