declare module "react-native-modal" {
  import { Component, ReactNode } from "react";
  import { StyleProp, ViewStyle } from "react-native";

  type AnimationConfig = string | { from: Object; to: Object };
  type Orientation =
    | "portrait"
    | "portrait-upside-down"
    | "landscape"
    | "landscape-left"
    | "landscape-right";

  export interface ModalProps {
    animationIn?: AnimationConfig;
    animationInTiming?: number;
    animationOut?: AnimationConfig;
    animationOutTiming?: number;
    avoidKeyboard?: boolean;
    backdropColor?: string;
    backdropOpacity?: number;
    backdropTransitionInTiming?: number;
    backdropTransitionOutTiming?: number;
    useNativeDriver?: boolean;
    children: ReactNode;
    deviceHeight?: number;
    deviceWidth?: number;
    hideModalContentWhileAnimating?: boolean;
    propagateSwipe?: boolean;
    isVisible: boolean;
    onModalShow?: () => void;
    onModalHide?: () => void;
    onBackButtonPress?: () => void;
    onBackdropPress?: () => void;
    onSwipeStart?: () => void;
    onSwipeMove?: (percentageShown: number) => void;
    onSwipeComplete?: () => void;
    onSwipeCancel?: () => void;
    swipeThreshold?: number;
    style?: StyleProp<ViewStyle>;
    swipeDirection?: "up" | "down" | "left" | "right";
    scrollTo?: (e: any) => void;
    scrollOffset?: number;
    scrollOffsetMax?: number;
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
