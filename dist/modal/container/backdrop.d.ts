import * as React from 'react';
import * as animatable from 'react-native-animatable';
declare const _default: React.ForwardRefExoticComponent<{
    hasBackdrop?: boolean | undefined;
    customBackdrop: React.ReactNode;
    deviceWidth: number;
    deviceHeight: number;
    showContent: boolean;
    backdropColor: string;
    useNativeDriver: boolean;
    useNativeDriverForBackdrop?: boolean | undefined;
    onBackdropPress: () => void;
} & React.RefAttributes<animatable.View>>;
export default _default;
