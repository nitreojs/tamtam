import Context from './context';

import TamTam from '../components/tamtam';

import {
  IUserRemovedContext,
  UpdateType,
  IMessagesSendParams,
} from '../../typings/params';

import { IUser } from '../../typings/interfaces';

declare class UserRemovedContext extends Context {
  public chatId: number;

  public user: IUser;

  public adminId: number;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: IUserRemovedContext);

  public is(types: UpdateType | Array<UpdateType>): boolean;

  public send(text: string, params?: IMessagesSendParams): Promise<void>;
}

export = UserRemovedContext;
