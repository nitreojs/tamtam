import * as Params from "./params";
import API from "../components/api";
import ChainKeyboard from "../lib/chainkeyboard";
import Keyboard from "../lib/keyboard";
import Markdown from "../lib/markdown";
import Updates from "../components/updates";

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
