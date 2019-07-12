import Context from "./context";

import TamTam from "../components/tamtam";

import {
  IBotRemovedContext,
  UpdateType,
  IMessagesSendParams,
} from "../../typings/params";

import { IUser } from "../../typings/interfaces";

declare class BotRemovedContext extends Context {
  public chatId: number;

  public user: IUser;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: IBotRemovedContext);

  public is(types: UpdateType | Array<UpdateType>): boolean;
}

export = BotRemovedContext;
