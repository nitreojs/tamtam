import {
  Button,
  IButtonCallback,
  IButtonLink,
  IButtonRequestContact,
  IButtonRequestGeoLocation,
} from "../typings/interfaces";
import * as Params from "../typings/params";

interface IKeyboardKeyboardPayload {
  buttons: Array<Button>;
}

interface IKeyboardKeyboardResponse {
  type: "inline_keyboard";

  payload: IKeyboardKeyboardPayload;
}

declare class Keyboard {
  /**
   * Positive color
   */
  public static POSITIVE_COLOR: "positive";

  /**
   * Negative color
   */
  public static NEGATIVE_COLOR: "negative";

  /**
   * Default color
   */
  public static DEFAULT_COLOR: "default";

  /**
   * Generate keyboard
   */
  public static keyboard(rows: Array<Array<Button>>): Array<IKeyboardKeyboardResponse>;

  /**
   * Generate callback button
   */
  public static callbackButton(params: Params.IKeyboardCallbackButtonParams): IButtonCallback;

  /**
   * Generate request geolocation button
   */
  public static geoButton(params: Params.IKeyboardGeoButtonParams): IButtonRequestGeoLocation;

  /**
   * Generate request contact button
   */
  public static contactButton(params: Params.IKeyboardContactButtonParams): IButtonRequestContact;

  /**
   * Generate link button
   */
  public static linkButton(params: Params.IKeyboardLinkButtonParams): IButtonLink;
}

export = Keyboard;
