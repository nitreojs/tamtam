import {
  Button,
  IButtonCallback,
  IButtonLink,
  IButtonRequestContact,
  IButtonRequestGeoLocation,
} from "../typings/interfaces";

import {
  IKeyboardCallbackButtonParams,
  IKeyboardGeoButtonParams,
  IKeyboardContactButtonParams,
  IKeyboardLinkButtonParams,
} from "../typings/params";

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
  public static callbackButton(params: IKeyboardCallbackButtonParams): IButtonCallback;

  /**
   * Generate request geolocation button
   */
  public static geoButton(params: IKeyboardGeoButtonParams): IButtonRequestGeoLocation;

  /**
   * Generate request contact button
   */
  public static contactButton(params: IKeyboardContactButtonParams): IButtonRequestContact;

  /**
   * Generate link button
   */
  public static linkButton(params: IKeyboardLinkButtonParams): IButtonLink;
}

export = Keyboard;
