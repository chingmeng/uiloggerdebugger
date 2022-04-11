import { TextStyle } from "react-native"

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  color: 'black',
  fontSize: 12,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   */
  header: {
    ...BASE,
    fontSize: 24,
    fontWeight: "bold",
  } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: {
    ...BASE,
    fontSize: 8,
  } as TextStyle,

  /**
   * Error text.
   */
  error: { ...BASE, color: "red", fontSize:8, } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
