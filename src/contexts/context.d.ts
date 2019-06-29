import TamTam from "../components/tamtam";
import { UpdateType } from "../../typings/params";

declare class Context {
  constructor(tamtam: TamTam, type: string);

  public is(types: UpdateType | Array<UpdateType>): boolean;
}

export = Context;
