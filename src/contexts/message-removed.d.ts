import Context from "./context";

import TamTam from "../components/tamtam";

import { IMessageRemovedContext, UpdateType } from "../../typings/params";

declare class MessageRemovedContext extends Context {
  public messageId: string;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: IMessageRemovedContext);

  public is(types: UpdateType | Array<UpdateType>): boolean;
}
