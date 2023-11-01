import * as React from 'react';
import {
  Animated,
  EmitterSubscription,
  PanResponderGestureState,
  PanResponderInstance,
  StyleProp,
  ViewStyle,
  ViewProps,
} from 'react-native';
import * as PropTypes from 'prop-types';
import * as animatable from 'react-native-animatable';
import {
  Direction,
  Orientation,
  OrNull,
  PresentationStyle,
  OnOrientationChange,
  GestureResponderEvent,
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
  animationIn:
    | animatable.Animation
    | animatable.CustomAnimation<
        import('react-native').TextStyle &
          ViewStyle &
          import('react-native').ImageStyle
      >;
  animationInTiming: number;
  animationOut:
    | animatable.Animation
    | animatable.CustomAnimation<
        import('react-native').TextStyle &
          ViewStyle &
          import('react-native').ImageStyle
      >;
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
  static propTypes: {
    animationIn: PropTypes.Requireable<
      NonNullable<string | object | null | undefined>
    >;
    animationInTiming: PropTypes.Requireable<number>;
    animationOut: PropTypes.Requireable<
      NonNullable<string | object | null | undefined>
    >;
    animationOutTiming: PropTypes.Requireable<number>;
    avoidKeyboard: PropTypes.Requireable<boolean>;
    coverScreen: PropTypes.Requireable<boolean>;
    hasBackdrop: PropTypes.Requireable<boolean>;
    backdropColor: PropTypes.Requireable<string>;
    backdropOpacity: PropTypes.Requireable<number>;
    backdropTransitionInTiming: PropTypes.Requireable<number>;
    backdropTransitionOutTiming: PropTypes.Requireable<number>;
    customBackdrop: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    deviceHeight: PropTypes.Requireable<number>;
    deviceWidth: PropTypes.Requireable<number>;
    isVisible: PropTypes.Validator<boolean>;
    hideModalContentWhileAnimating: PropTypes.Requireable<boolean>;
    propagateSwipe: PropTypes.Requireable<
      NonNullable<boolean | ((...args: any[]) => any) | null | undefined>
    >;
    onModalShow: PropTypes.Requireable<(...args: any[]) => any>;
    onModalWillShow: PropTypes.Requireable<(...args: any[]) => any>;
    onModalHide: PropTypes.Requireable<(...args: any[]) => any>;
    onModalWillHide: PropTypes.Requireable<(...args: any[]) => any>;
    onBackButtonPress: PropTypes.Requireable<(...args: any[]) => any>;
    onBackdropPress: PropTypes.Requireable<(...args: any[]) => any>;
    panResponderThreshold: PropTypes.Requireable<number>;
    onSwipeStart: PropTypes.Requireable<(...args: any[]) => any>;
    onSwipeMove: PropTypes.Requireable<(...args: any[]) => any>;
    onSwipeComplete: PropTypes.Requireable<(...args: any[]) => any>;
    onSwipeCancel: PropTypes.Requireable<(...args: any[]) => any>;
    swipeThreshold: PropTypes.Requireable<number>;
    swipeDirection: PropTypes.Requireable<
      NonNullable<string | (string | null | undefined)[] | null | undefined>
    >;
    useNativeDriver: PropTypes.Requireable<boolean>;
    useNativeDriverForBackdrop: PropTypes.Requireable<boolean>;
    style: PropTypes.Requireable<any>;
    scrollTo: PropTypes.Requireable<(...args: any[]) => any>;
    scrollOffset: PropTypes.Requireable<number>;
    scrollOffsetMax: PropTypes.Requireable<number>;
    scrollHorizontal: PropTypes.Requireable<boolean>;
    supportedOrientations: PropTypes.Requireable<(string | null | undefined)[]>;
  };
  static defaultProps: {
    animationIn:
      | animatable.Animation
      | animatable.CustomAnimation<
          import('react-native').TextStyle &
            ViewStyle &
            import('react-native').ImageStyle
        >;
    animationInTiming: number;
    animationOut:
      | animatable.Animation
      | animatable.CustomAnimation<
          import('react-native').TextStyle &
            ViewStyle &
            import('react-native').ImageStyle
        >;
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
  isSwipeDirectionAllowed: ({dy, dx}: PanResponderGestureState) => boolean;
  handleDimensionsUpdate: () => void;
  open: () => void;
  close: () => void;
  makeBackdrop: () => React.JSX.Element | null;
  render(): React.JSX.Element;
}
export default ReactNativeModal;
