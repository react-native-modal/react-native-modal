import {Animation, CustomAnimation} from 'react-native-animatable';
import {NativeSyntheticEvent, NativeTouchEvent} from 'react-native';
export declare type OrNull<T> = null | T;
export declare type SupportedAnimation = Animation | CustomAnimation;
export declare type Animations = {
  animationIn: string;
  animationOut: string;
};
export declare type Orientation =
  | 'portrait'
  | 'portrait-upside-down'
  | 'landscape'
  | 'landscape-left'
  | 'landscape-right';
export declare type Direction = 'up' | 'down' | 'left' | 'right';
export declare type AnimationEvent = (...args: any[]) => void;
export declare type PresentationStyle =
  | 'fullScreen'
  | 'pageSheet'
  | 'formSheet'
  | 'overFullScreen';
export declare type OnOrientationChange = (
  orientation: NativeSyntheticEvent<any>,
) => void;
export interface GestureResponderEvent
  extends NativeSyntheticEvent<NativeTouchEvent> {}
