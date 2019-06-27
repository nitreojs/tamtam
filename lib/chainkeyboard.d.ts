import * as Params from '../typings/params';

declare class ChainKeyboard {
  constructor();

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
   * Add callback button to the current row
   */
  callbackButton(params: Params.IKeyboardCallbackButtonParams): this;

  /**
   * Add geolocation request button to the current row
   */
  geoButton(params: Params.IKeyboardGeoButtonParams): this;

  /**
   * Add contact request button to the current row
   */
  contactButton(params: Params.IKeyboardContactButtonParams): this;

  /**
   * Add link button to the current row
   */
  linkButton(params: Params.IKeyboardLinkButtonParams): this;

  /**
   * Add row
   */
  row(): this;
}

export = ChainKeyboard;
