import API from "./api";

import {
  IChatsEditParams,
  IChatsGetChatsParams,
  IChatsSendActionParams,
  IChatsGetMembersParams,
  IChatsAddMembersParams,
  IChatsRemoveMemberParams,
} from "../../typings/params";

import {
  IChatsGetResponse,
  IChatsEditResponse,
  IChatsGetChatsResponse,
  IChatsSendActionResponse,
  IChatsGetChatMembershipResponse,
  IChatsLeaveResponse,
  IChatsGetMembersResponse,
  IChatsAddMembersResponse,
  IChatsRemoveMemberResponse,
  IChatsGetAdminsResponse,
} from "../../typings/responses";

declare class Chats {
  private api: API;

  constructor(api: API);

  public get(chatId: number): Promise<IChatsGetResponse>;

  public edit(chatId: number, params?: IChatsEditParams): Promise<IChatsEditResponse>;

  public getChats(params?: IChatsGetChatsParams): Promise<IChatsGetChatsResponse>;

  public sendAction(params: IChatsSendActionParams): Promise<IChatsSendActionResponse>;

  public getChatMembership(chatId: number): Promise<IChatsGetChatMembershipResponse>;

  public leave(chatId: number): Promise<IChatsLeaveResponse>;

  public getMembers(chatId: number, params?: IChatsGetMembersParams): Promise<IChatsGetMembersResponse>;

  public addMembers(params: IChatsAddMembersParams): Promise<IChatsAddMembersResponse>;

  public removeMember(params: IChatsRemoveMemberParams): Promise<IChatsRemoveMemberResponse>;

  public getAdmins(chatId: number): Promise<IChatsGetAdminsResponse>;
}

export = Chats;
