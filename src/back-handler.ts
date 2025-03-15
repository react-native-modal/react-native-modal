import {
  BackHandlerStatic,
  BackPressEventName,
  NativeEventSubscription,
  Platform,
} from 'react-native';

const noopBackHandler: BackHandlerStatic = {
  exitApp() {},
  addEventListener(
    eventName: BackPressEventName,
    handler: () => boolean | null | undefined,
  ): NativeEventSubscription {
    return { remove: () => {} };
  },
};

export const BackHandler: BackHandlerStatic =
  Platform.OS === 'web' ? noopBackHandler : require('react-native').BackHandler;
