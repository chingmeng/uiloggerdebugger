import { flatten } from "ramda"
import React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import Spacer from "../spacer/Spacer"
import { Text } from "../text/text"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing.small2,
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /** Error text to show */
  errorText?: string
  errorTx?: TxKeyPath

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    errorText,
    errorTx,
    ...rest
  } = props

  const containerStyles = flatten([CONTAINER, PRESETS[preset], styleOverride])
  const inputStyles = flatten([INPUT, inputStyleOverride])

  return (
    <View style={containerStyles}>
      <Text style={{fontSize: 12 }} text={label} />
      <Spacer margin={4}/>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'gray'}
        underlineColorAndroid={'white'}
        {...rest}
        style={[inputStyles, {paddingHorizontal: 8, borderBottomColor: 'black', borderWidth: 0.3}]}
        ref={forwardedRef}
      />
      <Spacer margin={4} />
      { errorText || errorTx ? (<Text preset="error" text={errorText} />) : null}
    </View>
  )
}
