import {Animation, CustomAnimation} from 'react-native-animatable';
import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';

export type OrNull<T> = null | T;

export type SupportedAnimation = Animation | CustomAnimation;
export type Animations = {
  animationIn: string;
  animationOut: string;
};

export type Orientation =
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right';

export type Direction = 'up' | 'down' | 'left' | 'right';
export type AnimationEvent = (...args: any[]) => void;
export type PresentationStyle =
  | 'fullScreen'
  | 'pageSheet'
  | 'formSheet'
  | 'overFullScreen';
export type OnOrientationChange = (
  orientation: NativeSyntheticEvent<any>,
) => void;

export interface GestureResponderEvent
  extends NativeSyntheticEvent<NativeTouchEvent> {}
