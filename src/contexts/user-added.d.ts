import Context from './context';

import TamTam from '../components/tamtam';

import {
  IUserAddedContext,
  UpdateType,
  IMessagesSendParams,
} from '../../typings/params';

import { IUser } from "../../typings/interfaces";

declare class UserAddedContext extends Context {
  public chatId: number;

  public user: IUser;

  public inviterId: number;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: IUserAddedContext);

  public is(types: UpdateType | Array<UpdateType>): boolean;

  public send(text: string, params?: IMessagesSendParams): Promise<void>;
}

export = UserAddedContext;
