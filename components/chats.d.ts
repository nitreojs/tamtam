import * as Params from '../typings/params';
import * as Responses from '../typings/responses';
import API from './api';

type Action = 'typing_on' | 'typing_off' | 'sending_photo' | 'sending_video' | 'sending_audio' | 'mark_seen';

declare class Chats {
  private api: API;

  constructor(api: API);

  public get(chatId: number): Promise<Responses.IChatsGetResponse>;

  public edit(chatId: number, params?: Params.IChatsEditParams): Promise<Responses.IChatsEditResponse>;

  public getChats(params?: Params.IChatsGetChatsParams): Promise<Responses.IChatsGetChatsResponse>;

  public sendAction(chatId: number, action: Action): Promise<Responses.IChatsSendActionResponse>;

  public getChatMembership(chatId: number): Promise<Responses.IChatsGetChatMembershipResponse>;

  public leave(chatId: number): Promise<Responses.IChatsLeaveResponse>;

  public getMembers(chatId: number, params?: Params.IChatsGetMembersParams): Promise<Responses.IChatsGetMembersResponse>;

  public addMembers(chatId: number, userIds: Array<number> | number): Promise<Responses.IChatsAddMembersResponse>;

  public removeMember(chatId: number, userId: number): Promise<Responses.IChatsRemoveMemberResponse>;
}

export = Chats;
