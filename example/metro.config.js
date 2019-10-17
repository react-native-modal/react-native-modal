/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const reactNativeModalRoot = path.resolve(__dirname, '..');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: [reactNativeModalRoot],
  resolver: {
    extraNodeModules: {
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
    blacklistRE: blacklist([
      new RegExp(`${reactNativeModalRoot}/node_modules/react-native/.*`),
    ]),
  },
};
