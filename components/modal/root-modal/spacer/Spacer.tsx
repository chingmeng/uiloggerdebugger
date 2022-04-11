import React from 'react';
import { View } from 'react-native';

  
const Spacer = (props: SpacerProps) => {

    const { margin, children } = props

    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{ margin: margin !== undefined? margin : 16}}>
            {children}
        </View>
    );
}

export default Spacer;


export interface SpacerProps {
    margin?: number
    children?: React.ReactNode
}
