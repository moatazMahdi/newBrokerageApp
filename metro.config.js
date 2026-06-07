const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer'
    ),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('src/')) {
        return context.resolveRequest(
          context,
          path.resolve(__dirname, moduleName),
          platform,
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
