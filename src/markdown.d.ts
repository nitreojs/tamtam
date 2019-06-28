declare class Markdown {
  /**
   * Generate bold text
   */
  public static bold(text: string): string;

  /**
   * Generate italic text
   */
  public static italic(text: string): string;

  /**
   * Generate code
   */
  public static code(text: string): string;
}

export = Markdown;
