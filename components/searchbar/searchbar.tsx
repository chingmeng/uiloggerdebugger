import React, { useState, useCallback, useRef } from "react"
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { Button } from "../button/button"
import { debounce } from "lodash";

export const SearchBar = ({ onChangeText, placeholder="Type to filter by tag", showIdentifiers = true, triggerUpdate, customIdentifiers }) => {

  const searchText = useRef('');
  const textInputRef = useRef('');

  const filterIdentifiers = customIdentifiers ?? [
    '@content ', 
    '@tag ',
    '@screen ',
    '@pscreen ',
    '@datetime ' 
  ]

  const editText = debounce((value) => {
    onChangeText && onChangeText(value);
    searchText.current = value;
  }, 300);

  return (
    <>
    <View style={SearchBarStyle.SEARCH_BAR_BASE}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'center' }}>
        <View style={SearchBarStyle.SEARCH_BAR_CONTAINER}>
          <TouchableOpacity style={{ flex: 0, alignItems: "center", justifyContent: 'center' }}>
            <Image style={SearchBarStyle.SEARCH_BAR_ICON} source={require("./icon_search.png")} />
          </TouchableOpacity>
          <TextInput
            ref={(ref) => {textInputRef.current = ref}}
            style={SearchBarStyle.SEARCH_BAR}
            placeholder={placeholder}
            selectTextOnFocus={true}
            maxLength={50}
            onChangeText={editText}
          />
          <TouchableOpacity style={{flex: 0, alignItems: "center", justifyContent: 'center'}} onPress={() => {
            onChangeText && onChangeText("");
            searchText.current = "";
            textInputRef.current.setNativeProps({ text: "" });
          }}>
            <Image 
              style={SearchBarStyle.SEARCH_BAR_ICON} 
              source={require("./icon_search_close.png")} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>

    {showIdentifiers && (<View style={{ flexDirection: 'row', height: 50, maxHeight: 50, flexGrow: 1, paddingVertical: 8 }}>
    {filterIdentifiers.map( (e, index) => {
      return (
        <Button
          key={'uiloggerdebugger-button-' + index}
          text={e.trim()}
          textStyle={{ fontSize: 12 }}
          style={{ flex: 0, backgroundColor: "#A865C9", margin: 4, paddingHorizontal: 8, paddingVertical: 2}}
          onPress={() => {
            const newText = searchText.current ? searchText.current.trim() + " " + e : searchText.current + e;
            searchText.current = newText;
            textInputRef.current.setNativeProps({ text: newText });
            triggerUpdate && triggerUpdate(newText);
          }}
        />
      )
    })}
    </View>)}
  
    </>
  )
}

export const SearchBarStyle = StyleSheet.create({
  SEARCH_BAR_BASE: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    width: "100%",
    borderColor: "#B3B1A8",
    height: 50, 
  },
  SEARCH_BAR_CONTAINER: {
    flexDirection: "row",
    alignItems: "stretch",
    paddingHorizontal: 15
  },
  SEARCH_BAR: {
    flex: 15,
    fontSize: 14,
    alignItems: "stretch",
    justifyContent: "space-between",
    marginHorizontal: 8
  },
  SEARCH_BAR_ICON: {
    resizeMode: "contain",
    height: 18,
    width: 18
  },
})
