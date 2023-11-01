import * as React from 'react';
import * as animatable from 'react-native-animatable';
import styles from '../modal.style';
import {TouchableWithoutFeedback} from 'react-native';

function Backdrop(
  {
    hasBackdrop,
    customBackdrop,
    deviceHeight,
    deviceWidth,
    showContent,
    backdropColor,
    useNativeDriver,
    useNativeDriverForBackdrop,
    onBackdropPress,
  }: {
    hasBackdrop?: boolean;
    customBackdrop: React.ReactNode;
    deviceWidth: number;
    deviceHeight: number;
    showContent: boolean;
    backdropColor: string;
    useNativeDriver: boolean;
    useNativeDriverForBackdrop?: boolean;
    onBackdropPress: () => void;
  },
  ref: React.Ref<animatable.View>,
) {
  const hasCustomBackdrop = !!customBackdrop;

  if (hasCustomBackdrop && !React.isValidElement(customBackdrop)) {
    console.warn(
      'Invalid customBackdrop element passed to Modal. You must provide a valid React element.',
    );
  }

  const backdropComputedStyle = [
    {
      width: deviceWidth,
      height: deviceHeight,
      backgroundColor:
        showContent && !hasCustomBackdrop ? backdropColor : 'transparent',
    },
  ];

  const component = (
    <animatable.View
      ref={ref}
      useNativeDriver={
        useNativeDriverForBackdrop !== undefined
          ? useNativeDriverForBackdrop
          : useNativeDriver
      }
      style={[styles.backdrop, backdropComputedStyle]}
    >
      {hasCustomBackdrop && customBackdrop}
    </animatable.View>
  );

  if (hasCustomBackdrop) {
    // The user will handle backdrop presses himself
    return component;
  }
  // If there's no custom backdrop, handle presses with
  // TouchableWithoutFeedback
  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      {component}
    </TouchableWithoutFeedback>
  );
}

export default React.forwardRef(Backdrop);
