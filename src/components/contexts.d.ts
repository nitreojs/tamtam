import * as Params from "../../typings/params";
import * as Responses from "../../typings/responses";
import TamTam from "./tamtam";

declare class Context {
  constructor(tamtam: TamTam, type: string);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;
}

declare class MessageCallbackContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageCallbackContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public sendNotification(text: string): Promise<Responses.IMessagesAnswerCallbackResponse>;
}

declare class MessageCreatedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageCreatedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class MessageEditedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageEditedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;

  public reply(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class MessageRemovedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IMessageRemovedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;
}

declare class UserAddedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IUserAddedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class UserRemovedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IUserRemovedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotStartedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IBotStartedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotAddedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IBotAddedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class BotRemovedContext extends Context {
  constructor(tamtam: TamTam, payload: Params.IBotRemovedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

declare class ChatTitleChanged extends Context {
  constructor(tamtam: TamTam, payload: Params.IChatTitleChangedContext);

  public is(types: Params.UpdateType | Array<Params.UpdateType>): boolean;

  public send(text: string, params?: Params.IMessagesSendParams): Promise<void>;
}

export {
  BotStartedContext,
  BotAddedContext,
  BotRemovedContext,
  ChatTitleChanged,
  Context,
  MessageCallbackContext,
  MessageCreatedContext,
  MessageEditedContext,
  MessageRemovedContext,
  UserAddedContext,
  UserRemovedContext,
};
