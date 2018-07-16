declare module "react-native-modal" {
  import { Component, ReactNode } from "react";
  import { StyleProp, ViewStyle } from "react-native";

  type AnimationConfig = string | { from: Object; to: Object };
  type Orientation = "portrait" | "portrait-upside-down" | "landscape" | "landscape-left" | "landscape-right";

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
    hideModalContentWhileAnimating?: boolean;
    isVisible: boolean;
    onModalShow?: () => void;
    onModalHide?: () => void;
    onBackButtonPress?: () => void;
    onBackdropPress?: () => void;
    onSwipe?: () => void;
    swipeThreshold?: number;
    style?: StyleProp<ViewStyle>;
    swipeDirection?: "up" | "down" | "left" | "right";
    scrollTo?: (e: any) => void;
    scrollOffset?: number;
    scrollOffsetMax?: number;
    supportedOrientations?: Orientation[];
  }

  class Modal extends Component<ModalProps> {}

  export default Modal;
}
