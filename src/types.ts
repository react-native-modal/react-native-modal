import {Animation, CustomAnimation} from 'react-native-animatable';
import {ReactNode} from 'react';
import {NativeSyntheticEvent, StyleProp, ViewStyle} from 'react-native';

export type SupportedAnimation = Animation | CustomAnimation;
export type Animations = {
  animationIn: string;
  animationOut: string;
};

type Orientation =
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right';
type Direction = 'up' | 'down' | 'left' | 'right';

type OnSwipeCompleteParams = {
  swipingDirection: Direction;
};
export type ModalProps = {
  animationIn?: Animation | CustomAnimation;
  animationInTiming?: number;
  animationOut?: Animation | CustomAnimation;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  hasBackdrop?: boolean;
  coverScreen?: boolean;
  backdropColor?: string;
  backdropOpacity?: number;
  backdropTransitionInTiming?: number;
  backdropTransitionOutTiming?: number;
  customBackdrop?: ReactNode;
  useNativeDriver?: boolean;
  children: ReactNode;
  deviceHeight?: number;
  deviceWidth?: number;
  hideModalContentWhileAnimating?: boolean;
  propagateSwipe?: boolean;
  isVisible: boolean;
  onModalShow?: () => void;
  onModalWillShow?: () => void;
  onModalHide?: () => void;
  onModalWillHide?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  onSwipeStart?: () => void;
  onSwipeMove?: (percentageShown: number) => void;
  onSwipeComplete?: (params: OnSwipeCompleteParams) => void;
  onSwipeCancel?: () => void;
  swipeThreshold?: number;
  style?: StyleProp<ViewStyle>;
  swipeDirection?: Direction | Array<Direction>;
  scrollTo?: (e: any) => void;
  scrollOffset?: number;
  scrollOffsetMax?: number;
  scrollHorizontal?: boolean;
  supportedOrientations?: Orientation[];
  onDismiss?: () => void;
  onShow?: () => void;
  hardwareAccelerated?: boolean;
  onOrientationChange?: (orientation: NativeSyntheticEvent<any>) => void;
  presentationStyle?:
    | 'fullScreen'
    | 'pageSheet'
    | 'formSheet'
    | 'overFullScreen';
};
