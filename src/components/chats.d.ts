import * as Params from "../../typings/params";
import * as Responses from "../../typings/responses";
import API from "./api";

declare class Chats {
  private api: API;

  constructor(api: API);

  public get(chatId: number): Promise<Responses.IChatsGetResponse>;

  public edit(chatId: number, params?: Params.IChatsEditParams): Promise<Responses.IChatsEditResponse>;

  public getChats(params?: Params.IChatsGetChatsParams): Promise<Responses.IChatsGetChatsResponse>;

  public sendAction(params: Params.IChatsSendActionParams): Promise<Responses.IChatsSendActionResponse>;

  public getChatMembership(chatId: number): Promise<Responses.IChatsGetChatMembershipResponse>;

  public leave(chatId: number): Promise<Responses.IChatsLeaveResponse>;

  public getMembers(chatId: number, params?: Params.IChatsGetMembersParams): Promise<
    Responses.IChatsGetMembersResponse
  >;

  public addMembers(params: Params.IChatsAddMembersParams): Promise<Responses.IChatsAddMembersResponse>;

  public removeMember(params: Params.IChatsRemoveMemberParams): Promise<Responses.IChatsRemoveMemberResponse>;
}

export = Chats;
