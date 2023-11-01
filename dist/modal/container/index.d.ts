import * as React from 'react';
export type ContainerRef = {
  open: () => Promise<void>;
  close: (args?: {immediate?: boolean}) => Promise<void>;
};
declare const _default: React.ForwardRefExoticComponent<
  Omit<
    import('../types').ModalProps,
    | 'animationIn'
    | 'animationOut'
    | 'animationInTiming'
    | 'animationOutTiming'
    | 'avoidKeyboard'
    | 'coverScreen'
    | 'hasBackdrop'
    | 'backdropColor'
    | 'backdropOpacity'
    | 'backdropTransitionInTiming'
    | 'backdropTransitionOutTiming'
    | 'customBackdrop'
    | 'useNativeDriver'
    | 'deviceHeight'
    | 'deviceWidth'
    | 'hideModalContentWhileAnimating'
    | 'propagateSwipe'
    | 'isVisible'
    | 'panResponderThreshold'
    | 'swipeThreshold'
    | 'onModalShow'
    | 'onModalWillShow'
    | 'onModalHide'
    | 'onModalWillHide'
    | 'onBackdropPress'
    | 'onBackButtonPress'
    | 'scrollOffset'
    | 'scrollOffsetMax'
    | 'scrollHorizontal'
    | 'statusBarTranslucent'
    | 'supportedOrientations'
  > &
    Required<
      Pick<
        import('../types').ModalProps,
        | 'animationIn'
        | 'animationOut'
        | 'animationInTiming'
        | 'animationOutTiming'
        | 'avoidKeyboard'
        | 'coverScreen'
        | 'hasBackdrop'
        | 'backdropColor'
        | 'backdropOpacity'
        | 'backdropTransitionInTiming'
        | 'backdropTransitionOutTiming'
        | 'customBackdrop'
        | 'useNativeDriver'
        | 'deviceHeight'
        | 'deviceWidth'
        | 'hideModalContentWhileAnimating'
        | 'propagateSwipe'
        | 'isVisible'
        | 'panResponderThreshold'
        | 'swipeThreshold'
        | 'onModalShow'
        | 'onModalWillShow'
        | 'onModalHide'
        | 'onModalWillHide'
        | 'onBackdropPress'
        | 'onBackButtonPress'
        | 'scrollOffset'
        | 'scrollOffsetMax'
        | 'scrollHorizontal'
        | 'statusBarTranslucent'
        | 'supportedOrientations'
      >
    > & {
      onToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
    } & React.RefAttributes<ContainerRef>
>;
export default _default;
