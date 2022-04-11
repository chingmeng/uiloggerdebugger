/* eslint-disable react-native/sort-styles */
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Clipboard, FlatList, StyleSheet, TextInput, View } from "react-native"
import { Button } from "../components/button/button"
import Spacer from "../components/modal/root-modal/spacer/Spacer"
import { Text } from "../components/text/text"
import { WipScreen } from "../components/wip/wip.screen"
import { Console } from "../console"
import { getEnv, rBLog, rLog } from "../logger"

export const ConsoleListing = ({ navigation }) => {
  const [arrays, setArrays] = useState(Console.getInstance().getArray())
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    console.log = (...a: any[]) => {
      if (a.length > 1) {
        const [tag, ...values] = a
        rBLog(tag)(values)
      } else {
        rLog(...a)
      }
    }
  }, [])

  useEffect(() => {
    setArrays(Console.getInstance().getArray())
  }, [isUpdated])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Listing (' + Console.getInstance().getArray().length.toString() +')',
      headerRight: () => getHeaderRightIcon(navigation, setIsUpdated, isUpdated)
    })

    return () => navigation.setOptions(null)
  }, [navigation, isUpdated])
  

  const ConsoleTagInput = (props) => {
    return (
      <TextInput
        multiline
        editable={false}
        style={[{ fontWeight: "200", fontFamily: 'Menlo', paddingHorizontal: 8 }, props.style]}
      >
        {props.children}
      </TextInput>
    )
  }

  const ConsoleItem = ({ item, index }) => {
    let showUrl =
      item.currentScreen === "CommonWebView" || item.currentScreen === "WebViewComponent"

    function getParameterByName(name) {
      name = name.replace(/[\[\]]/g, "\\$&")
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(item.url)
      if (!results) return null
      if (!results[2]) return ""
      return decodeURIComponent(results[2].replace(/\+/g, " "))
    }

    return (
      <View style={{ marginVertical: 8, marginHorizontal: 16 }}>

        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{`${item.tag}`}</Text>
        <Spacer margin={4} />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text text={"DEV"} style={{fontSize: 12, fontWeight: '500'}} />
        </View>
        <Spacer margin={4} />
        <Text style={{ fontSize: 10 }} text={item.now} />
        <Spacer margin={2} />
        <ConsoleTagInput style={{ flex: 1, marginVertical: 8, backgroundColor: "lightgray" }}>
          {item.content?.substring(0, 200)}
        </ConsoleTagInput>

        <Text
          style={{ fontSize: 16 }}
          text={`Current: ${item.currentScreen}\nPrevious: ${item.previousScreen}`}
        />

        <View style={{ ...LayoutStyle.HORIZONTAL_FLEX, padding: 8 }} />
        {true ? (
          <>
            <ConsoleTagInput style={{ fontWeight: "300", fontFamily: "Menlo", fontStyle: "italic" }}>
              Url: {`${item.url} `}
            </ConsoleTagInput>
            <ConsoleTagInput style={{ fontWeight: "300", fontStyle: "italic" }}>
              InfoParams: {getParameterByName("infoParam") ? `${"base64?"}` : null}
            </ConsoleTagInput>
            <Spacer margin={4}/>
          </>
        ) : null}

        <View style={{ ...LayoutStyle.HORIZONTAL_FLEX }}>
          <Button
            text="Details"
            textStyle={{ color: "white", fontSize: 12 }}
            style={{ flex: 1, backgroundColor: "purple", margin: 4 }}
            onPress={() => navigation.navigate("ConsoleDetail", { content: item })}
          />

          <Button
            text="Copy"
            textStyle={{ color: "white", fontSize: 12 }}
            style={{ flex: 1, backgroundColor: "purple", margin: 4 }}
            onPress={() => {
              let content = item.content
              if (showUrl) {
                content =
                  "InfoParams: " +
                  getParameterByName("infoParam") +
                  "\n\n" +
                  content +
                  `\n\nCurrent: ${item.previousScreen}\nPrevious: ${item.currentScreen}`
              }

              const texts = `----${item.tag} (${
                item.now
              }) [[ ${getEnv()} ]]----${"\n"}${content}${"\n"}----END ${item.tag} (${
                item.now
              }) [[ ${getEnv()} ]] ----`
              Clipboard.setString(texts)
            }}
          />
        </View>

      
      </View>
    )
  }

  return (
    <View style={{ ...LayoutStyle.VERTICAL_FLEX }}>
      <FlatList
        data={arrays}
        keyExtractor={(item, index) => index.toString()}
        style={{flexGrow: 1, width: '100%', backgroundColor: "beige" }}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<WipScreen text="Empty List" />}
        ItemSeparatorComponent={() => (<View
          style={{
            borderWidth: 0.5,
            borderColor: "black",
            margin: 10,
          }}
        />)}
        renderItem={ConsoleItem}
      />
    </View>
  )
}

export const LayoutStyle = StyleSheet.create({
  BUTTON: {
    height: 53,
  },
  HORIZONTAL_FLEX: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  VERTICAL_FLEX: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
})

const getHeaderRightIcon = (navigation, setIsUpdated, isUpdated) => {
    return (
      <Button
        style={{ marginEnd: 16, backgroundColor: 'purple' }}
        text="FILTER"
        textStyle={{ fontSize: 12, color: 'white' }}
        onPress={() => {
          navigation.navigate('ConsoleTags', { triggerUpdate: () => setIsUpdated(!isUpdated)})
        }}
      />
    )
}
