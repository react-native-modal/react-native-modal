const path = require('path');
const {makeMetroConfig} = require('@rnx-kit/metro-config');

module.exports = makeMetroConfig({
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    enableSymlinks: true,
    extraNodeModules: {
      'react-native-modal': path.resolve(__dirname, '../../dist/'),
    },
  },
  watchFolders: [
    path.join(__dirname, 'node_modules', 'react-native-modal'),
    path.resolve(__dirname, '../..'),
  ],
});
