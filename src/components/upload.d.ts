import API from "./api";
import { IUploadGetUrlResponse } from "../../typings/responses";

type UploadType = "photo" | "video" | "audio" | "file";

export default class Upload {
  private api: API;

  constructor(api: API);

  public getUrl(type?: UploadType): Promise<IUploadGetUrlResponse>;
}
