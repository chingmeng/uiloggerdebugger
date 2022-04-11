/* eslint-disable react-native/sort-styles */
import React from "react"
import { TextInput } from "react-native"
import Spacer from "../components/modal/root-modal/spacer/Spacer"

export const ConsoleDetail = ({ route }) => {
  const item = route?.params?.content

  return (
    <>
      <TextInput
        multiline
        editable={false}
        style={[{ fontWeight: "500", fontFamily: "Menlo", padding: 8 }]}
      >
        {item.tag}
      </TextInput>

      <Spacer />
      <TextInput
        multiline
        editable={false}
        style={[{ fontWeight: "200", fontFamily: "Menlo", paddingHorizontal: 8 }]}
      >
        {item.content}
      </TextInput>
    </>
  )
}
