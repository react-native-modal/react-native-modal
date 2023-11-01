import * as React from 'react';
import {
  NativeSyntheticEvent,
  NativeTouchEvent,
  PanResponderGestureState,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Animation, CustomAnimation} from 'react-native-animatable';

export type OnSwipeCompleteParams = {
  swipingDirection: Direction;
};

export type ModalProps = ViewProps & {
  animationIn?: Animation | CustomAnimation;
  animationOut?: Animation | CustomAnimation;
  animationInTiming?: number;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  coverScreen?: boolean;
  hasBackdrop?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  customBackdrop?: React.ReactNode;
  useNativeDriver?: boolean;
  deviceHeight?: number;
  deviceWidth?: number;
  hideModalContentWhileAnimating?: boolean;
  propagateSwipe?:
    | boolean
    | ((
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => boolean);
  isVisible?: boolean;
  panResponderThreshold?: number;
  swipeThreshold?: number;
  onModalShow?: () => void;
  onModalWillShow?: () => void;
  onModalHide?: () => void;
  onModalWillHide?: () => void;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => boolean | null | undefined;
  scrollTo?: (_e: any) => void;
  scrollOffset?: number;
  scrollOffsetMax?: number;
  scrollHorizontal?: boolean;
  statusBarTranslucent?: boolean;
  supportedOrientations?: Orientation[];
  children: React.ReactNode;
  onSwipeStart?: (gestureState: PanResponderGestureState) => void;
  onSwipeMove?: (
    percentageShown: number,
    gestureState: PanResponderGestureState,
  ) => void;
  onSwipeComplete?: (
    params: OnSwipeCompleteParams,
    gestureState: PanResponderGestureState,
  ) => void;
  onSwipeCancel?: (gestureState: PanResponderGestureState) => void;
  style?: StyleProp<ViewStyle>;
  swipeDirection?: Direction | Array<Direction>;
  onDismiss?: () => void;
  onShow?: () => void;
  hardwareAccelerated?: boolean;
  onOrientationChange?: OnOrientationChange;
  presentationStyle?: PresentationStyle;

  // Default ModalProps Provided
  useNativeDriverForBackdrop?: boolean;
};

export const defaultProps = {
  animationIn: 'slideInUp',
  animationInTiming: 300,
  animationOut: 'slideOutDown',
  animationOutTiming: 300,
  avoidKeyboard: false,
  coverScreen: true,
  hasBackdrop: true,
  backdropColor: 'black',
  backdropOpacity: 0.7,
  backdropTransitionInTiming: 300,
  backdropTransitionOutTiming: 300,
  customBackdrop: null,
  useNativeDriver: false,
  hideModalContentWhileAnimating: false,
  propagateSwipe: false,
  isVisible: false,
  panResponderThreshold: 4,
  swipeThreshold: 100,
  onModalShow: () => null,
  onModalWillShow: () => null,
  onModalHide: () => null,
  onModalWillHide: () => null,
  onBackdropPress: () => null,
  onBackButtonPress: () => null,
  scrollOffset: 0,
  scrollOffsetMax: 0,
  scrollHorizontal: false,
  statusBarTranslucent: false,
  supportedOrientations: ['portrait', 'landscape'],
} satisfies Partial<ModalProps>;

type RequiredMergedPropsKeys =
  | keyof typeof defaultProps
  | 'deviceHeight'
  | 'deviceWidth';

export type MergedModalProps = Omit<ModalProps, RequiredMergedPropsKeys> &
  Required<Pick<ModalProps, RequiredMergedPropsKeys>>;

export type SupportedAnimation = Animation | CustomAnimation;
export type Animations = {
  animationIn: Animation | CustomAnimation;
  animationOut: Animation | CustomAnimation;
};

export type CustomAnimationType =
  | 'slideInDown'
  | 'slideInUp'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideOutDown'
  | 'slideOutUp'
  | 'slideOutLeft'
  | 'slideOutRight';

export type Orientation =
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right';

export type Direction = 'up' | 'down' | 'left' | 'right';
export type AnimationEvent = (...args: any[]) => void;
export type PresentationStyle =
  | 'fullScreen'
  | 'pageSheet'
  | 'formSheet'
  | 'overFullScreen';
export type OnOrientationChange = (
  orientation: NativeSyntheticEvent<any>,
) => void;

export interface GestureResponderEvent
  extends NativeSyntheticEvent<NativeTouchEvent> {}
