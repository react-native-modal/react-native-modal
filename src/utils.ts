import {Dimensions} from 'react-native';
import * as animatable from 'react-native-animatable';
import {CustomAnimation} from 'react-native-animatable';
import {Animations} from './types';
import {Animation} from 'react-native-animatable';

const {height, width} = Dimensions.get('window');

export const initializeAnimations = () => {
  // Since react-native-animatable applies by default a margin of 100 to its
  // sliding animation, we reset them here overriding the margin to 0.
  const animationDefinitions: Record<string, CustomAnimation> = {
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

export const makeSlideTranslation = (
  translationType: string,
  fromValue: number,
  toValue: number,
) => {
  return {
    from: {
      [translationType]: fromValue,
    },
    to: {
      [translationType]: toValue,
    },
  };
};

// User can define custom react-native-animatable animations, see PR #72
// Utility for creating our own custom react-native-animatable animations
export const buildAnimations = ({
  animationIn,
  animationOut,
}: {
  animationIn: Animation | CustomAnimation;
  animationOut: Animation | CustomAnimation;
}): Animations => {
  let updatedAnimationIn: string;
  let updatedAnimationOut: string;

  if (isObject(animationIn)) {
    const animationName = JSON.stringify(animationIn);
    makeAnimation(animationName, animationIn as CustomAnimation);
    updatedAnimationIn = animationName;
  } else {
    updatedAnimationIn = animationIn;
  }

  if (isObject(animationOut)) {
    const animationName = JSON.stringify(animationOut);
    makeAnimation(animationName, animationOut as CustomAnimation);
    updatedAnimationOut = animationName;
  } else {
    updatedAnimationOut = animationOut;
  }

  return {
    animationIn: updatedAnimationIn,
    animationOut: updatedAnimationOut,
  };
};

export const reversePercentage = (x: number) => -(x - 1);

const makeAnimation = (name: string, obj: CustomAnimation): void => {
  animatable.registerAnimation(
    name,
    animatable.createAnimation(obj) as CustomAnimation,
  );
};

const isObject = (obj: any): obj is Object => {
  return obj !== null && typeof obj === 'object';
};
