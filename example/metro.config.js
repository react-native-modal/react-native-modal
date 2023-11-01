const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');

const reactNativeModalRoot = path.resolve(__dirname, '..');
const config = {
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
      'react': path.resolve(__dirname, 'node_modules/react'),
    },
    blacklistRE: [
      new RegExp(`${reactNativeModalRoot}/node_modules/react-native/.*`),
      new RegExp(`${reactNativeModalRoot}/node_modules/react/.*`)
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
