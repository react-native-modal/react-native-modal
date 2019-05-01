import { Dimensions } from 'react-native';
import * as animatable from 'react-native-animatable';

const { height, width } = Dimensions.get('window');

export const initializeAnimations = () => {
  const makeSlideTranslation = (translationType, fromValue, toValue) => {
    return {
      from: {
        [translationType]: fromValue,
      },
      to: {
        [translationType]: toValue,
      },
    };
  };
  // Since react-native-animatable applies by default a margin of 100 to its
  // sliding animation, we reset them here overriding the margin to 0.
  const animationDefinitions = {
    slideInDown: makeSlideTranslation('translateY', -height, 0),
    slideInUp: makeSlideTranslation('translateY', height, 0),
    slideInLeft: makeSlideTranslation('translateX', -width, 0),
    slideInRight: makeSlideTranslation('translateX', width, 0),
    slideOutDown: makeSlideTranslation('translateY', 0, height),
    slideOutUp: makeSlideTranslation('translateY', 0, -height),
    slideOutLeft: makeSlideTranslation('translateX', 0, -width),
    slideOutRight: makeSlideTranslation('translateX', 0, width),
  };
  animatable.initializeRegistryWithDefinitions(animationDefinitions);
};

// User can define custom react-native-animatable animations, see PR #72
// Utility for creating our own custom react-native-animatable animations
export const buildAnimations = ({ animationIn, animationOut }) => {
  let updatedAnimationIn = animationIn;
  let updatedAnimationOut = animationOut;

  if (isObject(animationIn)) {
    const animationName = JSON.stringify(animationIn);
    makeAnimation(animationName, animationIn);
    updatedAnimationIn = animationName;
  }

  if (isObject(animationOut)) {
    const animationName = JSON.stringify(animationOut);
    makeAnimation(animationName, animationOut);
    updatedAnimationOut = animationName;
  }

  return {
    animationIn: updatedAnimationIn,
    animationOut: updatedAnimationOut,
  };
};

const makeAnimation = (name, obj) => {
  animatable.registerAnimation(name, animatable.createAnimation(obj));
};

const isObject = obj => {
  return obj !== null && typeof obj === 'object';
};
