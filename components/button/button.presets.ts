import { TextStyle, ViewStyle } from "react-native"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  paddingVertical: 8,
  paddingHorizontal: 8,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: 8,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW } as ViewStyle,

  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "flex-start",
  } as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
  primary: { ...BASE_TEXT, fontSize: 9, color: 'white' } as TextStyle,
  link: {
    ...BASE_TEXT,
    color: 'black',
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
