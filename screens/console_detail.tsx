/* eslint-disable react-native/sort-styles */
import React, { useState } from "react"
import { ScrollView, Text, Clipboard } from "react-native"
import { SearchBar } from "../components/searchbar/searchbar"
import { Button } from "../components/button/button"
import HighlightText from '@sanar/react-native-highlight-text';

export const ConsoleDetail = ({ route }) => {
  const item = route?.params?.content;
  const envName = route?.params?.envName;
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <Text 
        selectable={true} 
        style={{ 
          color: 'black', 
          fontSize: 20, 
          padding: 16, 
          backgroundColor: 'cyan' 
        }}>{item.tag}</Text>

      <SearchBar 
        showIdentifiers={true}
        placeholder={"Highlights texts"}
        customIdentifiers={[
          "title"
        ]}
        triggerUpdate={(text) => {
          setSearchText(text);
        }}
        onChangeText={(text) => {
          setSearchText(text);
        }}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 8 }}>
          <HighlightText
            highlightStyle={{ backgroundColor: 'yellow' }}
            selectable={true} style={{ color: 'black' }}
            searchWords={searchText.split(',')}
            textToHighlight={item.content}
          />
      </ScrollView>

      <Button 
          text={"COPY"} 
          textStyle={{fontSize: 16, fontWeight: 'bold'}}
          style={{height: 48, backgroundColor: "purple", margin: 4}} 
          onPress={() => {
            let content = item.content
            const texts = `----${item.tag} (${
              item.now
            }) [[ ${envName} ]]----${"\n"}${content}${"\n"}----END ${item.tag} (${
              item.now
            }) [[ ${envName} ]] ----`
            Clipboard.setString(texts)
          }} 
      />
    </>
  )
}
