import Context from './context';

import TamTam from '../components/tamtam';

import {
  IBotAddedContext,
  UpdateType,
  IMessagesSendParams,
} from '../../typings/params';

import { IUser } from '../../typings/interfaces';

declare class BotAddedContext extends Context {
  public chatId: number;

  public user: IUser;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: IBotAddedContext);

  public is(types: UpdateType | Array<UpdateType>): boolean;

  public send(text: string, params?: IMessagesSendParams): Promise<void>;
}

export = BotAddedContext;
