import * as Params from "./params";
import API from "../src/components/api";
import ChainKeyboard from "../src/chain-keyboard";
import Keyboard from "../src/keyboard";
import Markdown from "../src/markdown";
import Updates from "../src/components/updates";

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
