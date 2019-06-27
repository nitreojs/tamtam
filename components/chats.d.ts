import * as Params from '../typings/params';
import * as Responses from '../typings/responses';
import API from './api';

type Action = 'typing_on' | 'typing_off' | 'sending_photo' | 'sending_video' | 'sending_audio' | 'mark_seen';

declare class Chats {
  constructor(api: API);

  private api: API;

  get(chatId: number): Promise<Responses.IChatsGetResponse>;

  edit(chatId: number, params?: Params.IChatsEditParams): Promise<Responses.IChatsEditResponse>;

  getChats(params?: Params.IChatsGetChatsParams): Promise<Responses.IChatsGetChatsResponse>;

  sendAction(chatId: number, action: Action): Promise<Responses.IChatsSendActionResponse>;

  getChatMembership(chatId: number): Promise<Responses.IChatsGetChatMembershipResponse>;

  leave(chatId: number): Promise<Responses.IChatsLeaveResponse>;

  getMembers(chatId: number, params?: Params.IChatsGetMembersParams): Promise<Responses.IChatsGetMembersResponse>;

  addMembers(chatId: number, userIds: Array<number> | number): Promise<Responses.IChatsAddMembersResponse>;

  removeMember(chatId: number, userId: number): Promise<Responses.IChatsRemoveMemberResponse>;
}

export = Chats;
