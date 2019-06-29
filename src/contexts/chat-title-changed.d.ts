import Context from './context';

import TamTam from '../components/tamtam';

import {
  IChatTitleChangedContext,
  UpdateType,
  IMessagesSendParams,
} from '../../typings/params';

import { IUser } from '../../typings/interfaces';

declare class ChatTitleChanged extends Context {
  public chatId: number;

  public user: IUser;

  public title: string;

  public timestamp: number;

  constructor(tamtam: TamTam, payload: IChatTitleChangedContext);

  public is(types: UpdateType | Array<UpdateType>): boolean;

  public send(text: string, params?: IMessagesSendParams): Promise<void>;
}

export = ChatTitleChanged;
