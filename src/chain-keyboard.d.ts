import {
  IKeyboardCallbackButtonParams,
  IKeyboardGeoButtonParams,
  IKeyboardContactButtonParams,
  IKeyboardLinkButtonParams,
} from "../typings/params";

declare class ChainKeyboard {
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

  constructor();

  /**
   * Add callback button to the current row
   */
  public callbackButton(params: IKeyboardCallbackButtonParams): this;

  /**
   * Add geolocation request button to the current row
   */
  public geoButton(params: IKeyboardGeoButtonParams): this;

  /**
   * Add contact request button to the current row
   */
  public contactButton(params: IKeyboardContactButtonParams): this;

  /**
   * Add link button to the current row
   */
  public linkButton(params: IKeyboardLinkButtonParams): this;

  /**
   * Add row
   */
  public row(): this;
}

export = ChainKeyboard;
