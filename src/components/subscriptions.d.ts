import API from "./api";

import {
  ISubscriptionsSubscribeParams,
  ISubscriptionsGetUpdatesParams,
} from "../../typings/params";

import {
  ISubscriptionsGetResponse,
  ISubscriptionsSubscribeResponse,
  ISubscriptionsUnsubscribeResponse,
  ISubscriptionsGetUpdatesResponse,
} from "../../typings/responses";

export default class Subscriptions {
  private api: API;

  constructor(api: API);

  public get(): Promise<ISubscriptionsGetResponse>;

  public subscribe(url: string, params?: ISubscriptionsSubscribeParams): Promise<
    ISubscriptionsSubscribeResponse
  >;

  public unsubscribe(url: string): Promise<ISubscriptionsUnsubscribeResponse>;

  public getUpdates(params?: ISubscriptionsGetUpdatesParams): Promise<
    ISubscriptionsGetUpdatesResponse
  >;
}
