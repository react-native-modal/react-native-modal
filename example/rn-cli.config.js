const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const reactNativeModalRoot = path.resolve(__dirname, '..');

module.exports = {
  projectRoot: __dirname,
  watchFolders: [reactNativeModalRoot],
  resolver: {
    blacklistRE: blacklist([new RegExp(`${reactNativeModalRoot}/node_modules/react-native/.*`)]),
    providesModuleNodeModules: ['react-native-animatable']
  },
};
