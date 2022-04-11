/* eslint-disable react-native/no-inline-styles */
import { observer } from "mobx-react-lite"
import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { Text } from "../text/text"

export const WipScreen = observer(({text, style}) => {
  return (
    <View testID="WipScreen" style={[{flex : 1}, style]}>
      <View style={LayoutStyle.VERTICAL_FLEX_CENTER}>
        <Image resizeMode="cover" style={{width: 100, height: 100}} source={require("./gears.png")} />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
          }}
          text={text || "Work In Progress..."}
        />
      </View>
    </View>
  )
})

const LayoutStyle = StyleSheet.create({
  VERTICAL_FLEX_CENTER: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
})