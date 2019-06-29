import { IErrorParams } from "../../typings/params";

declare class TamTamError extends Error {
  constructor(options: IErrorParams);
}

export = TamTamError;
