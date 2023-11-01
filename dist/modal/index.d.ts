import * as React from 'react';
import {ContainerRef} from './container';
export {ContainerRef as ReactNativeModalRef};
declare const _default: React.ForwardRefExoticComponent<
  import('react-native').ViewProps & {
    animationIn?:
      | import('react-native-animatable').Animation
      | import('react-native-animatable').CustomAnimation<
          import('react-native').TextStyle &
            import('react-native').ViewStyle &
            import('react-native').ImageStyle
        >
      | undefined;
    animationOut?:
      | import('react-native-animatable').Animation
      | import('react-native-animatable').CustomAnimation<
          import('react-native').TextStyle &
            import('react-native').ViewStyle &
            import('react-native').ImageStyle
        >
      | undefined;
    animationInTiming?: number | undefined;
    animationOutTiming?: number | undefined;
    avoidKeyboard?: boolean | undefined;
    coverScreen?: boolean | undefined;
    hasBackdrop?: boolean | undefined;
    backdropColor?: string | undefined;
    backdropOpacity?: number | undefined;
    backdropTransitionInTiming?: number | undefined;
    backdropTransitionOutTiming?: number | undefined;
    customBackdrop?: React.ReactNode;
    useNativeDriver?: boolean | undefined;
    deviceHeight?: number | undefined;
    deviceWidth?: number | undefined;
    hideModalContentWhileAnimating?: boolean | undefined;
    propagateSwipe?:
      | boolean
      | ((
          event: import('./types').GestureResponderEvent,
          gestureState: import('react-native').PanResponderGestureState,
        ) => boolean)
      | undefined;
    isVisible?: boolean | undefined;
    panResponderThreshold?: number | undefined;
    swipeThreshold?: number | undefined;
    onModalShow?: (() => void) | undefined;
    onModalWillShow?: (() => void) | undefined;
    onModalHide?: (() => void) | undefined;
    onModalWillHide?: (() => void) | undefined;
    onBackdropPress?: (() => void) | undefined;
    onBackButtonPress?: (() => boolean | null | undefined) | undefined;
    scrollTo?: ((_e: any) => void) | undefined;
    scrollOffset?: number | undefined;
    scrollOffsetMax?: number | undefined;
    scrollHorizontal?: boolean | undefined;
    statusBarTranslucent?: boolean | undefined;
    supportedOrientations?: import('./types').Orientation[] | undefined;
    children: React.ReactNode;
    onSwipeStart?:
      | ((
          gestureState: import('react-native').PanResponderGestureState,
        ) => void)
      | undefined;
    onSwipeMove?:
      | ((
          percentageShown: number,
          gestureState: import('react-native').PanResponderGestureState,
        ) => void)
      | undefined;
    onSwipeComplete?:
      | ((
          params: import('./types').OnSwipeCompleteParams,
          gestureState: import('react-native').PanResponderGestureState,
        ) => void)
      | undefined;
    onSwipeCancel?:
      | ((
          gestureState: import('react-native').PanResponderGestureState,
        ) => void)
      | undefined;
    style?: import('react-native').StyleProp<import('react-native').ViewStyle>;
    swipeDirection?:
      | import('./types').Direction
      | import('./types').Direction[]
      | undefined;
    onDismiss?: (() => void) | undefined;
    onShow?: (() => void) | undefined;
    hardwareAccelerated?: boolean | undefined;
    onOrientationChange?: import('./types').OnOrientationChange | undefined;
    presentationStyle?: import('./types').PresentationStyle | undefined;
    useNativeDriverForBackdrop?: boolean | undefined;
  } & React.RefAttributes<ContainerRef>
>;
export default _default;
