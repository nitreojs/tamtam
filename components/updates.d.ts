import { Middleware, NextMiddleware, MiddlewareReturn } from 'middleware-io';
import { Request, Response } from 'express';

import * as Params from '../typings/params';
import {
  Context,
  IMessageCallbackContext,
  IMessageCreatedContext,
  IMessageEditedContext,
  IMessageRemovedContext,
  IUserAddedContext,
  IUserRemovedContext,
  IBotStartedContext,
  IBotAddedContext,
  IBotRemovedContext,
  IChatTitleChangedContext,
} from '../typings/interfaces';

type Handler<T = Context> = Middleware<T>;
type WebhookCallback = (req: Request, res: Response, next: NextMiddleware) => Promise<MiddlewareReturn>;

/**
 * Updates
 * 
 * Code provided by @negezor
 */
declare class Updates {
  constructor(tamtam: Params.ITamTamParams);

  /**
   * Returns webhook callback like http[s] or express
   */
  getWebhookCallback(): WebhookCallback;

  /**
   * Add middleware
   */
  use(...middlewares: Array<Handler>): this;

  /**
   * Start polling
   */
  startPolling(callback?: () => void): Promise<any>;

  /**
   * A handler that is called when handlers are not found
   */
  setHearFallbackHandler(handler: Handler): this;

  /**
   * Subscribe to events
   */
  on(events: 'message_callback', handler: Handler<IMessageCallbackContext>): this;

  on(events: 'message_created', handler: Handler<IMessageCreatedContext>): this;

  on(events: 'message_edited', handler: Handler<IMessageEditedContext>): this;

  on(events: 'message_removed', handler: Handler<IMessageRemovedContext>): this;

  on(events: 'user_added', handler: Handler<IUserAddedContext>): this;

  on(events: 'user_removed', handler: Handler<IUserRemovedContext>): this;

  on(events: 'bot_started', handler: Handler<IBotStartedContext>): this;

  on(events: 'bot_added', handler: Handler<IBotAddedContext>): this;

  on(events: 'bot_removed', handler: Handler<IBotRemovedContext>): this;

  on(events: 'chat_title_changed', handler: Handler<IChatTitleChangedContext>): this;

  on(events: Array<Params.UpdateType> | Params.UpdateType, handler: Handler): this;

  stopPolling(): this;
}

export = Updates;
