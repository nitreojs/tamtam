import API from "./api";
import { ITamTamParams } from "../../typings/params";
import Updates from "./updates";

declare class TamTam {
  public api: API;
  public updates: Updates;

  constructor(params: ITamTamParams);
}

export = TamTam;
