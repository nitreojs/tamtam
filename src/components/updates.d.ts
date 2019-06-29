import {
  Context,
  IBotStartedContext,
  IBotAddedContext,
  IBotRemovedContext,
  IChatTitleChangedContext,
  IMessageCallbackContext,
  IMessageCreatedContext,
  IMessageEditedContext,
  IMessageRemovedContext,
  IUserAddedContext,
  IUserRemovedContext,
} from "../../typings/interfaces";

import { ITamTamParams, UpdateType } from "../../typings/params";

import { Middleware, MiddlewareReturn, NextMiddleware } from "middleware-io";
import { Response, Request } from "express";

type Handler<T = Context> = (context: T, next: NextMiddleware) => any;
type WebhookCallback = (req: Request, res: Response, next: NextMiddleware) => Promise<MiddlewareReturn>;

/**
 * Updates
 *
 * Code provided by @negezor
 */
declare class Updates {
  constructor(tamtam: ITamTamParams);

  /**
   * Returns webhook callback like http[s] or express
   */
  public getWebhookCallback(): WebhookCallback;

  /**
   * Add middleware
   */
  public use(...middlewares: Array<Handler>): this;

  /**
   * Start polling
   */
  public startPolling(): Promise<void>;

  /**
   * A handler that is called when handlers are not found
   */
  public setHearFallbackHandler(handler: Handler): this;

  /**
   * Subscribe to events
   */
  public on(events: "message_callback", handler: Handler<IMessageCallbackContext>): this;

  public on(events: "message_created", handler: Handler<IMessageCreatedContext>): this;

  public on(events: "message_edited", handler: Handler<IMessageEditedContext>): this;

  public on(events: "message_removed", handler: Handler<IMessageRemovedContext>): this;

  public on(events: "user_added", handler: Handler<IUserAddedContext>): this;

  public on(events: "user_removed", handler: Handler<IUserRemovedContext>): this;

  public on(events: "bot_started", handler: Handler<IBotStartedContext>): this;

  public on(events: "bot_added", handler: Handler<IBotAddedContext>): this;

  public on(events: "bot_removed", handler: Handler<IBotRemovedContext>): this;

  public on(events: "chat_title_changed", handler: Handler<IChatTitleChangedContext>): this;

  public on(events: Array<UpdateType> | UpdateType, handler: Handler): this;

  public stopPolling(): this;
}

export = Updates;
