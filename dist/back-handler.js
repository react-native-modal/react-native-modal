import { Platform } from 'react-native';
const noopBackHandler = {
  exitApp() {},
  addEventListener(eventName, handler) {
    return { remove: () => {} };
  },
  removeEventListener: () => {},
};
export const BackHandler =
  Platform.OS === 'web' ? noopBackHandler : require('react-native').BackHandler;
