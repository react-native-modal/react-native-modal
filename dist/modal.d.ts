import * as React from 'react';
import {
  Animated,
  EmitterSubscription,
  PanResponderGestureState,
  PanResponderInstance,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Animation, CustomAnimation } from 'react-native-animatable';
import {
  Direction,
  GestureResponderEvent,
  OnOrientationChange,
  Orientation,
  OrNull,
  PresentationStyle,
} from './types';
export type OnSwipeCompleteParams = {
  swipingDirection: Direction;
};
type State = {
  showContent: boolean;
  isVisible: boolean;
  deviceWidth: number;
  deviceHeight: number;
  isSwipeable: boolean;
  pan: OrNull<Animated.ValueXY>;
};
declare const defaultProps: {
  animationIn: Animation | CustomAnimation;
  animationInTiming: number;
  animationOut: Animation | CustomAnimation;
  animationOutTiming: number;
  avoidKeyboard: boolean;
  coverScreen: boolean;
  hasBackdrop: boolean;
  backdropColor: string;
  backdropOpacity: number;
  backdropTransitionInTiming: number;
  backdropTransitionOutTiming: number;
  customBackdrop: React.ReactNode;
  useNativeDriver: boolean;
  deviceHeight: OrNull<number>;
  deviceWidth: OrNull<number>;
  hideModalContentWhileAnimating: boolean;
  propagateSwipe:
    | boolean
    | ((
        event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => boolean);
  isVisible: boolean;
  panResponderThreshold: number;
  swipeThreshold: number;
  onModalShow: () => void;
  onModalWillShow: () => void;
  onModalHide: () => void;
  onModalWillHide: () => void;
  onBackdropPress: () => void;
  onBackButtonPress: () => void;
  scrollTo: OrNull<(e: any) => void>;
  scrollOffset: number;
  scrollOffsetMax: number;
  scrollHorizontal: boolean;
  statusBarTranslucent: boolean;
  supportedOrientations: Orientation[];
};
export type ModalProps = ViewProps & {
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
  useNativeDriverForBackdrop?: boolean;
} & typeof defaultProps;
export declare class ReactNativeModal extends React.Component<
  ModalProps,
  State
> {
  static defaultProps: {
    animationIn: Animation | CustomAnimation;
    animationInTiming: number;
    animationOut: Animation | CustomAnimation;
    animationOutTiming: number;
    avoidKeyboard: boolean;
    coverScreen: boolean;
    hasBackdrop: boolean;
    backdropColor: string;
    backdropOpacity: number;
    backdropTransitionInTiming: number;
    backdropTransitionOutTiming: number;
    customBackdrop: React.ReactNode;
    useNativeDriver: boolean;
    deviceHeight: OrNull<number>;
    deviceWidth: OrNull<number>;
    hideModalContentWhileAnimating: boolean;
    propagateSwipe:
      | boolean
      | ((
          event: GestureResponderEvent,
          gestureState: PanResponderGestureState,
        ) => boolean);
    isVisible: boolean;
    panResponderThreshold: number;
    swipeThreshold: number;
    onModalShow: () => void;
    onModalWillShow: () => void;
    onModalHide: () => void;
    onModalWillHide: () => void;
    onBackdropPress: () => void;
    onBackButtonPress: () => void;
    scrollTo: OrNull<(e: any) => void>;
    scrollOffset: number;
    scrollOffsetMax: number;
    scrollHorizontal: boolean;
    statusBarTranslucent: boolean;
    supportedOrientations: Orientation[];
  };
  private backHandler;
  state: State;
  isTransitioning: boolean;
  inSwipeClosingState: boolean;
  currentSwipingDirection: OrNull<Direction>;
  animationIn: string;
  animationOut: string;
  backdropRef: any;
  contentRef: any;
  panResponder: OrNull<PanResponderInstance>;
  didUpdateDimensionsEmitter: OrNull<EmitterSubscription>;
  interactionHandle: OrNull<number>;
  constructor(props: ModalProps);
  static getDerivedStateFromProps(
    nextProps: Readonly<ModalProps>,
    state: State,
  ): {
    isVisible: boolean;
    showContent: boolean;
  } | null;
  componentDidMount(): void;
  componentWillUnmount(): void;
  componentDidUpdate(prevProps: ModalProps): void;
  getDeviceHeight: () => number;
  getDeviceWidth: () => number;
  onBackButtonPress: () => boolean;
  shouldPropagateSwipe: (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => boolean;
  buildPanResponder: () => void;
  getAccDistancePerDirection: (
    gestureState: PanResponderGestureState,
  ) => number;
  getSwipingDirection: (
    gestureState: PanResponderGestureState,
  ) => 'up' | 'down' | 'left' | 'right';
  calcDistancePercentage: (gestureState: PanResponderGestureState) => number;
  createAnimationEventForSwipe: () => (...args: any[]) => void;
  isDirectionIncluded: (direction: Direction) => boolean;
  isSwipeDirectionAllowed: ({ dy, dx }: PanResponderGestureState) => boolean;
  handleDimensionsUpdate: () => void;
  open: () => void;
  close: () => void;
  makeBackdrop: () => React.JSX.Element | null;
  render(): React.JSX.Element;
}
export default ReactNativeModal;
