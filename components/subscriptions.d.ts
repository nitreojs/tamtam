import API from "./api";
import * as Params from "../typings/params";
import * as Responses from "../typings/responses";

export default class Subscriptions {
  private api: API;

  constructor(api: API);

  public get(): Promise<Responses.ISubscriptionsGetResponse>;

  public subscribe(url: string, params?: Params.ISubscriptionsSubscribeParams): Promise<
    Responses.ISubscriptionsSubscribeResponse
  >;

  public unsubscribe(url: string): Promise<Responses.ISubscriptionsUnsubscribeResponse>;

  public getUpdates(params?: Params.ISubscriptionsGetUpdatesParams): Promise<
    Responses.ISubscriptionsGetUpdatesResponse
  >;
}
