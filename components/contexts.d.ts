import TamTam from './tamtam';
import * as Responses from '../typings/responses';
import * as Params from '../typings/params';

declare class Context {
  constructor(tamtam: TamTam, type: string);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;
}

declare class MessageCallbackContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageCallbackContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  sendNotification(text: string): Promise<Responses.IMessagesAnswerCallbackResponse>;
}

declare class MessageCreatedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageCreatedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class MessageEditedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageEditedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class MessageRemovedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageRemovedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;
}

declare class UserAddedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IUserAddedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class UserRemovedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IUserRemovedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotStartedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IBotStartedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotAddedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IBotAddedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotRemovedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IBotRemovedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class ChatTitleChanged extends Context {
  constructor(tamtam: TamTam, payload: Params.IChatTitleChangedContext);

  is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

export = {
  Context,
  MessageCallbackContext,
  MessageCreatedContext,
  MessageEditedContext,
  MessageRemovedContext,
  UserAddedContext,
  UserRemovedContext,
  BotStartedContext,
  BotAddedContext,
  BotRemovedContext,
  ChatTitleChanged,
};
