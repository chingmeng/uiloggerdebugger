/* eslint-disable react-native/sort-styles */
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from '../components/button/button';
import { WipScreen } from '../components/wip/wip.screen';
import { Console } from '../console';

export const ConsoleTags = ({ route, navigation }) => {

    const arrays = useRef(Console.getInstance().getTags());
    const triggerUpdate = route?.params?.triggerUpdate;

    const ConsoleItem = ({ item, index }) => {
       return (
           <View 
            key={'console-tag-'+index}
            style={{
                flexGrow: 1,
                marginVertical: 8, 
                marginHorizontal: 8,
                width: 0, // Add this line will limit flexGrow to screen size(?)
            }}
            >
               <Button 
                text={item} 
                textStyle={{fontSize: 16, fontWeight: 'bold'}}
                numberOfLines={2} 
                style={{flex: 1, backgroundColor: "purple", margin: 4}} 
                onPress={() => {
                    Console.getInstance().setArrayByTag(item)
                    triggerUpdate && triggerUpdate();
                    navigation.goBack();
                }} 
            />
            </View>
       ) 
    }

    return (
        <FlatList
           data={arrays.current}
           numColumns={2}        
           keyExtractor={(item, index) => index.toString()}
           style={{flex : 1, backgroundColor: 'beige'}}
           contentContainerStyle={{ flexGrow: 1 }}
           ListEmptyComponent={<WipScreen text="Empty List" />}
           renderItem={ConsoleItem}
       />
   )
};

export const LayoutStyle = StyleSheet.create({
    BUTTON: {
        height: 53,
    },
    HORIZONTAL_FLEX: {
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    HORIZONTAL_FLEX_CENTER: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});