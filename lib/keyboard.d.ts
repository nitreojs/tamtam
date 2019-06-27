import * as Params from '../typings/params';
import {
  IButton,
  IButtonCallback,
  IButtonLink,
  IButtonRequestContact,
  IButtonRequestGeoLocation,
} from '../typings/interfaces';

interface IKeyboardKeyboardPayload {
  buttons: Array<IButton>;
}

interface IKeyboardKeyboardResponse {
  type: 'inline_keyboard';

  payload: IKeyboardKeyboardPayload;
}

declare class Keyboard {
  /**
   * Positive color
   */
  static POSITIVE_COLOR: 'positive';

  /**
   * Negative color
   */
  static NEGATIVE_COLOR: 'negative';

  /**
   * Default color
   */
  static DEFAULT_COLOR: 'default';

  /**
   * Generate keyboard
   */
  static keyboard(rows: Array<Array<IButton>>): Array<IKeyboardKeyboardResponse>;

  /**
   * Generate callback button
   */
  static callbackButton(params: Params.IKeyboardCallbackButtonParams): IButtonCallback;

  /**
   * Generate request geolocation button
   */
  static geoButton(params: Params.IKeyboardGeoButtonParams): IButtonRequestGeoLocation;

  /**
   * Generate request contact button
   */
  static contactButton(params: Params.IKeyboardContactButtonParams): IButtonRequestContact;

  /**
   * Generate link button
   */
  static linkButton(params: Params.IKeyboardLinkButtonParams): IButtonLink;
}

export = Keyboard;
