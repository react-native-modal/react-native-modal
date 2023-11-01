import * as React from 'react';
import {Modal, View, useWindowDimensions} from 'react-native';
import {ModalProps, defaultProps} from './types';

import {initializeAnimations} from '../utils';
import ReactNativeModalContainer, {ContainerRef} from './container';
import styles from './modal.style';

// Override default react-native-animatable animations
initializeAnimations();

export {ContainerRef as ReactNativeModalRef};

function ReactNativeModal(props: ModalProps, ref: React.Ref<ContainerRef>) {
  const {height: windowDeviceHeight, width: windowDeviceWidth} =
    useWindowDimensions();

  const mergedProps = {
    ...defaultProps,
    deviceWidth: windowDeviceWidth,
    deviceHeight: windowDeviceHeight,
    ...props,
  };

  const {
    animationIn: animationInFromProps,
    animationInTiming,
    animationOut: animationOutFromProps,
    animationOutTiming,
    avoidKeyboard,
    coverScreen,
    hasBackdrop,
    backdropColor,
    backdropOpacity,
    backdropTransitionInTiming,
    backdropTransitionOutTiming,
    customBackdrop,
    children,
    isVisible,
    onModalShow,
    onBackButtonPress,
    useNativeDriver,
    propagateSwipe,
    style,
    deviceWidth,
    deviceHeight,
    swipeDirection,
    useNativeDriverForBackdrop,
    onBackdropPress,
    hideModalContentWhileAnimating,
    onModalWillShow,
    onModalHide,
    onModalWillHide,
    ...otherProps
  } = mergedProps;

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  if (!coverScreen && (isModalVisible || isVisible)) {
    return (
      <View
        pointerEvents="box-none"
        style={[styles.backdrop, styles.containerBox]}
      >
        <ReactNativeModalContainer
          {...mergedProps}
          isVisible={isVisible}
          onToggleModal={setIsModalVisible}
          ref={ref}
        />
      </View>
    );
  }

  // open -> isModalVisible OR isVisible, close -> isModalVisible NAND isVisible
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={isModalVisible || isVisible}
      onRequestClose={onBackButtonPress}
      {...otherProps}
    >
      <ReactNativeModalContainer
        {...mergedProps}
        isVisible={isVisible}
        onToggleModal={setIsModalVisible}
        ref={ref}
      />
    </Modal>
  );
}

export default React.forwardRef(ReactNativeModal);
