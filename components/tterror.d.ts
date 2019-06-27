declare class TamTamError extends Error {
  constructor(params: { code: string; message: string; });
}

export = TamTamError;
