import { flatten } from "ramda"
import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { textPresets, viewPresets } from "./button.presets"
import { ButtonProps } from "./button.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    numberOfLines,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  if (rest.disabled === true) {
    viewStyle.opacity = 0.5
  } else {
    viewStyle.opacity = 1.0
  }

  const viewStyles = flatten([viewStyle, styleOverride])
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = flatten([textStyle, textStyleOverride])

  const content = children || <Text text={text} style={textStyles} />

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      <Text numberOfLines={numberOfLines}>{content}</Text>
    </TouchableOpacity>
  )
}
