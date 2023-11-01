import * as React from 'react';
import * as animatable from 'react-native-animatable';
import styles from './modal.style';
import { TouchableWithoutFeedback } from 'react-native';
function Backdrop({ hasBackdrop, customBackdrop, deviceHeight, deviceWidth, showContent, backdropColor, useNativeDriver, useNativeDriverForBackdrop, onBackdropPress, }, ref) {
    const hasCustomBackdrop = !!customBackdrop;
    if (hasCustomBackdrop && !React.isValidElement(customBackdrop)) {
        console.warn('Invalid customBackdrop element passed to Modal. You must provide a valid React element.');
    }
    const backdropComputedStyle = [
        {
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: showContent && !hasCustomBackdrop ? backdropColor : 'transparent',
        },
    ];
    const component = (React.createElement(animatable.View, { ref: ref, useNativeDriver: useNativeDriverForBackdrop !== undefined
            ? useNativeDriverForBackdrop
            : useNativeDriver, style: [styles.backdrop, backdropComputedStyle] }, hasCustomBackdrop && customBackdrop));
    if (hasCustomBackdrop) {
        // The user will handle backdrop presses himself
        return component;
    }
    // If there's no custom backdrop, handle presses with
    // TouchableWithoutFeedback
    return (React.createElement(TouchableWithoutFeedback, { onPress: onBackdropPress }, component));
}
export default React.forwardRef(Backdrop);
