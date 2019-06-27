import * as Params from '../typings/params';

declare class ChainKeyboard {
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

  constructor();

  /**
   * Add callback button to the current row
   */
  public callbackButton(params: Params.IKeyboardCallbackButtonParams): this;

  /**
   * Add geolocation request button to the current row
   */
  public geoButton(params: Params.IKeyboardGeoButtonParams): this;

  /**
   * Add contact request button to the current row
   */
  public contactButton(params: Params.IKeyboardContactButtonParams): this;

  /**
   * Add link button to the current row
   */
  public linkButton(params: Params.IKeyboardLinkButtonParams): this;

  /**
   * Add row
   */
  public row(): this;
}

export = ChainKeyboard;
