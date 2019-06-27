import * as Params from "../typings/params";
import * as Responses from "../typings/responses";
import API from "./api";

type UploadType = "photo" | "video" | "audio" | "file";

export default class Upload {
  private api: API;

  constructor(api: API);

  public getUrl(type?: UploadType): Promise<Responses.IUploadGetUrlResponse>;
}
