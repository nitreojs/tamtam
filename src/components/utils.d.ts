import { Readable, Stream } from "stream";

declare class Utils {
  /**
   * Convert buffer to stream
   */
  public static bufferToStream(buffer: Buffer): Readable;

  /**
   * Actually bufferToStream but reversed
   */
  public static streamToBuffer(stream: Stream): Promise<Buffer>;
}

export = Utils;
