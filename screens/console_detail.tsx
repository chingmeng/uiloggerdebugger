/* eslint-disable react-native/sort-styles */
import React from "react"
import { TextInput, ScrollView, Text } from "react-native"
import Spacer from "../components/modal/root-modal/spacer/Spacer"

export const ConsoleDetail = ({ route }) => {
  const item = route?.params?.content

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text selectable={true} style={{ color: 'black' }}>{item.tag}</Text>
      </ScrollView>

      <Spacer />

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8 }}>
          <Text selectable={true} style={{ color: 'black' }}>{item.content}</Text>
      </ScrollView>
    </>
  )
}
