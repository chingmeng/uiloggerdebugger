import React, { useState, useCallback } from "react"
import { Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import { Button } from "../button/button"
import { debounce } from "lodash";

export const SearchBar = ({ onChangeText }) => {

  const [searchText, setSearchText] = useState('');
  const filterIdentifiers = [
    '@content ', 
    '@tag ',
    '@screen ',
    '@pscreen ',
    '@datetime ' 
  ]

  const onSearchTextChanged = useCallback(debounce((value) => {
    onChangeText(value)
    setSearchText(value)
  }, 300), []);

  return (
    <>
    <View style={SearchBarStyle.SEARCH_BAR_BASE}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={SearchBarStyle.SEARCH_BAR_CONTAINER}>
          <TouchableOpacity>
            <Image style={SearchBarStyle.SEARCH_BAR_ICON} source={require("./icon_search.png")} />
          </TouchableOpacity>
          <TextInput
            style={SearchBarStyle.SEARCH_BAR}
            value={searchText}
            placeholder="Type to filter by tag"
            selectTextOnFocus={true}
            maxLength={50}
            onChangeText={onSearchTextChanged}
          />
        </View>
      </View>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 1 }}>
    {filterIdentifiers.map( (e, index) => {
      return (
        <Button
          text={e.trim()}
          textStyle={{ fontSize: 12 }}
          style={{ flex: 0, backgroundColor: "#A865C9", margin: 4, paddingHorizontal: 0, paddingVertical: 2}}
          onPress={() => {
            setSearchText(searchText ? searchText + ' ' + e : searchText + e)
          }}
        />
      )
    })}
    </View>
    </>
  )
}

const windowWidth = Dimensions.get("window").width

export const SearchBarStyle = StyleSheet.create({
  SEARCH_BAR_BASE: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#B3B1A8",
    width: windowWidth,
    height: 50
  },
  SEARCH_BAR_CONTAINER: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 15,
  },
  SEARCH_BAR: {
    flex: 1,
    fontSize: 14,
    alignItems: "stretch",
    marginLeft: 5
  },
  SEARCH_BAR_ICON: {
    resizeMode: "contain",
    height: 18,
    width: 18
  },
})
