/* eslint-disable react-native/sort-styles */
import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from '../components/button/button';
import { WipScreen } from '../components/wip/wip.screen';
import { Console } from '../console';
import { rBLog, rLog } from '../logger';

export const ConsoleTags = ({ route, navigation }) => {

    const arrays = useRef(Console.getInstance().getTags());
    const triggerUpdate = route?.params?.triggerUpdate;

    useEffect(() => {
        console.log = (...a: any[]) => {
            if (a.length > 1) {
                const [tag, ...values] = a;
                rBLog(tag)(values);
            } else {
                rLog(...a);
            }
        };
    }, []);

    const ConsoleItem = ({ item, index }) => {
       return (
           <View 
            key={'console-tag-'+index}
            style={{marginVertical: 8, marginHorizontal: 16, backgroundColor: "beige"}}>
               <Button 
                text={item} 
                textStyle={{fontSize: 12}}
                style={{backgroundColor: "purple", margin: 4}} 
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
           keyExtractor={(item, index) => index.toString()}
           style={{flex : 0, backgroundColor: 'beige'}}
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