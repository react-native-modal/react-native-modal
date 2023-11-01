import { RefObject } from 'react';
import { Animated } from 'react-native';
import { View } from 'react-native-animatable';
import { CustomAnimationType, MergedModalProps } from '../types';
export declare const usePanResponder: (props: Pick<MergedModalProps, 'scrollTo' | 'scrollOffset' | 'onSwipeStart' | 'backdropOpacity' | 'scrollOffsetMax' | 'panResponderThreshold' | 'propagateSwipe' | 'swipeDirection' | 'swipeThreshold' | 'onSwipeMove' | 'onSwipeCancel' | 'onSwipeComplete' | 'scrollHorizontal' | 'deviceWidth' | 'deviceHeight'>, refs: {
    backdropRef: RefObject<View>;
}) => {
    pan: Animated.ValueXY;
    panResponder: import("react-native").PanResponderInstance;
    getAnimationForSwipe: () => CustomAnimationType | undefined;
};
