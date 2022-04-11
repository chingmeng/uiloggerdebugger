import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { CustomModal } from '../custom-modal/custom.modal';

export const RootModal = ({
    containerVisibility = false,
    onBackdropPress,
    leftAction = {title: 'Cancel', action: undefined, dismissByDefault: true},
    middleAction = null,
    rightAction = {title: 'OK', action: undefined, dismissByDefault: true},
    children = null,
}) => {

    if (leftAction && !leftAction.action) {
        leftAction.action = onBackdropPress;
    }

    if (rightAction && !rightAction.action) {
        rightAction.action = onBackdropPress;
    }

    return (
        <CustomModal
            onBackdropPress={onBackdropPress}
            isVisible={containerVisibility}>
            <View
                style={{
                    ...RootModalStyle.MODAL_VIEW,
                    zIndex: 100,
                    width: "100%",
                    height: "100%"
                }}>

                {children || null}

                <View style={{margin: 8}} />

                <View style={RootModalStyle.BUTTON_CONTAINER}>
                    {[leftAction, middleAction, rightAction]
                        .reverse()
                        .filter((e) => !!e)
                        .map((action, index) => (
                            <Button
                                key={index.toString()}
                                text={action.title.toUpperCase()}
                                style={{...RootModalStyle.BUTTON}}
                                textStyle={{
                                    color: '#1d1d1d',
                                    fontWeight: 'bold',
                                }}
                                onPress={() => {
                                    if (action.action) {
                                        action.action();
                                    }
                                    if (action.dismissByDefault !== false) {
                                        onBackdropPress();
                                    }
                                }}
                            />
                        ))}
                </View>
            </View>
        </CustomModal>
    );
};

export function Button(props) {
    // grab the props
    const {
        preset = 'primary',
        tx,
        text,
        style: styleOverride,
        textStyle: textStyleOverride,
        children,
        ...rest
    } = props;

    const viewStyle = {
        padding: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: rest.disabled === true ? 0.5 : 1.0
    };

    const viewStyles = {...viewStyle, ...styleOverride};
    const textStyle = {
        padding: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    };
    const textStyles = {...textStyle, ...textStyleOverride};

    const content = children || <Text style={textStyles}>{text}</Text>;

    return (
        <TouchableOpacity style={viewStyles} {...rest}>
            {content}
        </TouchableOpacity>
    );
}

const RootModalStyle = StyleSheet.create({
    BUTTON: {
        height: 53,
    },
    BUTTON_CONTAINER: {
        flex: 0,
        flexDirection: 'row-reverse',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    CONTENT: {
        fontSize: 12,
        padding: 8,
        backgroundColor: '#ececec',
    },
    MODAL_VIEW: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        margin: 20,
        shadowColor: 'grey',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});