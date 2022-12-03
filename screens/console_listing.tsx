/* eslint-disable react-native/sort-styles */
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Clipboard, FlatList, StyleSheet, TextInput, View, ScrollView, Text as RText } from "react-native"
import { SearchBar } from "uiloggerdebugger/components/searchbar/searchbar"
import { Button } from "../components/button/button"
import Spacer from "../components/modal/root-modal/spacer/Spacer"
import { Text } from "../components/text/text"
import { WipScreen } from "../components/wip/wip.screen"
import { Console } from "../console"

export const ConsoleListing = ({ route,  navigation }) => {
  const [arrays, setArrays] = useState(Console.getInstance().getArray())
  const [isUpdated, setIsUpdated] = useState(false);

  const envName = route.params.env;

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

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8 }}>
        <RText 
          selectable={true}
          style={{ 
          fontWeight: "200", 
          fontFamily: 'Menlo', 
          paddingHorizontal: 8, 
          color: 'black',
          flex: 1, 
          marginVertical: 8, 
          backgroundColor: "lightgray"
        }}>{props.children}</RText>
      </ScrollView>
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
          <Text text={envName} style={{fontSize: 12, fontWeight: '500'}} />
        </View>
        <Spacer margin={4} />
        <Text style={{ fontSize: 10 }} text={item.now} />
        <Spacer margin={2} />
        <ConsoleTagInput>
          {item.content?.substring(0, 200)}
        </ConsoleTagInput>

        <Text
          style={{ fontSize: 16 }}
          text={`Current: ${item.currentScreen}\nPrevious: ${item.previousScreen}`}
        />

        <View style={{ ...LayoutStyle.HORIZONTAL_FLEX, padding: 8 }} />

        <View style={{ ...LayoutStyle.HORIZONTAL_FLEX }}>
          <Button
            text="Details"
            textStyle={{ color: "white", fontSize: 12 }}
            style={{ flex: 1, backgroundColor: "purple", margin: 4 }}
            onPress={() => navigation.navigate("ConsoleDetail", { content: item, envName })}
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
              }) [[ ${envName} ]]----${"\n"}${content}${"\n"}----END ${item.tag} (${
                item.now
              }) [[ ${envName} ]] ----`
              Clipboard.setString(texts)
            }}
          />
        </View>

      
      </View>
    )
  }

  return (
    <View style={{ 
      ...LayoutStyle.VERTICAL_FLEX, 
      shadowColor: "black",
      shadowOpacity: 0.3,
      shadowRadius: 4,
      shadowOffset: { height: 1, width: 0}  
    }}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginHorizontal: 8 }}>{`Trails (Max 10)`}</Text>
      <View style={{flexDirection: 'row'}}>
          <Text 
            text={Console.getInstance().navigations.join(' -> ')}
            style={{ margin: 8 }}
          />
      </View> 
      <SearchBar 
        onChangeText={(text) => {
          Console.getInstance().filterBySearchText(text)
          setIsUpdated(!isUpdated);
        }}
      />
      <FlatList
        data={arrays}
        keyExtractor={(item, index) => index.toString()}
        style={{flexGrow: 1, width: '100%', backgroundColor: "beige" }}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<WipScreen bigText="NOT FOUND" smallText="No Logs found, please amend your search and try again."/>}
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
