declare module "react-native-modal" {
  import { Component, ReactNode } from "react";
  import { StyleProp, ViewStyle } from "react-native";
  import { Animation, CustomAnimation } from "react-native-animatable"

  type AnimationConfig = Animation | CustomAnimation;
  type Orientation =
    | "portrait"
    | "portrait-upside-down"
    | "landscape"
    | "landscape-left"
    | "landscape-right";
  type Direction = "up" | "down" | "left" | "right";

  export interface ModalProps {
    animationIn?: AnimationConfig;
    animationInTiming?: number;
    animationOut?: AnimationConfig;
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
    onSwipeComplete?: () => void;
    onSwipeCancel?: () => void;
    swipeThreshold?: number;
    style?: StyleProp<ViewStyle>;
    swipeDirection?: Direction | Array<Direction>;
    scrollTo?: (e: any) => void;
    scrollOffset?: number;
    scrollOffsetMax?: number;
    scrollHorizontal?: boolean,
    supportedOrientations?: Orientation[];
    onDismiss?: () => void;
    onShow?: () => void;
    hardwareAccelerated?: boolean;
    onOrientationChange?: (orientation: "portrait" | "landscape") => void;
    presentationStyle?:
      | "fullScreen"
      | "pageSheet"
      | "formSheet"
      | "overFullScreen";
  }

  class Modal extends Component<ModalProps> {}

  export default Modal;
}
