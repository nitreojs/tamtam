import * as Params from '../typings/params';
import * as Responses from '../typings/responses';
import API from './api';

type UploadType = 'photo' | 'video' | 'audio' | 'file';

export default class Upload {
  constructor(api: API);

  private api: API;

  getUrl(type?: UploadType): Promise<Responses.IUploadGetUrlResponse>;
}
