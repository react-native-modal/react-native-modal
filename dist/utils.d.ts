import { Animation, CustomAnimation } from 'react-native-animatable';
import { Animations } from './types';
export declare const initializeAnimations: () => void;
export declare const makeSlideTranslation: (
  translationType: string,
  fromValue: number,
  toValue: number,
) => {
  from: {
    [x: string]: number;
  };
  to: {
    [x: string]: number;
  };
};
export declare const buildAnimations: ({
  animationIn,
  animationOut,
}: {
  animationIn: Animation | CustomAnimation;
  animationOut: Animation | CustomAnimation;
}) => Animations;
export declare const reversePercentage: (x: number) => number;
