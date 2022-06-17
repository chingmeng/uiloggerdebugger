/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "../text/text";

export const WipScreen = ({bigText, smallText, style}) => {
  return (
    <View testID="WipScreen" style={[{flex : 1}, style]}>
      <View style={{...LayoutStyle.VERTICAL_FLEX_CENTER, flex: 1}}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 32,
            color: "gray"
          }}
          text={bigText || "Work In Progress..."}
        />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 16,
            color: "gray",
            margin: 16,
            textAlign: 'center'
          }}
          text={smallText || "Work In Progress..."}
        />
      </View>
    </View>
  )
};

const LayoutStyle = StyleSheet.create({
  VERTICAL_FLEX_CENTER: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
})