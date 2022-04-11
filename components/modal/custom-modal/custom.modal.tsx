/* eslint-disable react-native/sort-styles */
import React, { useEffect } from 'react';
import {
    Animated,
    StyleSheet,
    View
} from 'react-native';
import { Button } from '../root-modal/root.modal';

export const CustomModal = (props) => {
    const {style, children, onBackdropPress, isVisible} = props;
    const [fadeAnim, setFadeAnim] = React.useState(new Animated.Value(0));
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => { isVisible && fadeIn() }, [isVisible]);

    return (
        <>
            {isVisible ? (
                <Animated.View
                    style={[
                        {...CustomModalStyle.BASE_CONTAINER, opacity: fadeAnim},
                        style,
                    ]}>
                    <View style={CustomModalStyle.BODY}>
                        <Button
                            onPress={onBackdropPress}
                            style={CustomModalStyle.BACKDROP_BUTTON}
                        />
                        {children}
                    </View>
                </Animated.View>
            ) : null}
        </>
    );
};

const CustomModalStyle = StyleSheet.create({
    BACKDROP_BUTTON: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.5,
        backgroundColor: '#1d1d1d', // transparent
    },
    BACKDROP: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1,
    },
    BASE_CONTAINER: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 20,
    },
    BODY: {
        zIndex: 3,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
