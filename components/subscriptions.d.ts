import * as Params from '../typings/params';
import * as Responses from '../typings/responses';
import API from './api';

export default class Subscriptions {
  constructor(api: API);

  private api: API;

  get(): Promise<Responses.ISubscriptionsGetResponse>;

  subscribe(url: string, params?: Params.ISubscriptionsSubscribeParams): Promise<Responses.ISubscriptionsSubscribeResponse>;

  unsubscribe(url: string): Promise<Responses.ISubscriptionsUnsubscribeResponse>;

  getUpdates(params?: Params.ISubscriptionsGetUpdatesParams): Promise<Responses.ISubscriptionsGetUpdatesResponse>;
}
