/**
 * Babel configuration for SilentSync (React Native 0.87, New Architecture).
 *
 * IMPORTANT ordering rules:
 *  - `module-resolver` sets up the path aliases (@features, @shared, ...).
 *  - `react-native-worklets/plugin` MUST be the LAST plugin in the list
 *    (required by react-native-reanimated v4 + worklets). It is skipped in the
 *    Jest test environment (reanimated uses its mock there).
 */
module.exports = function (api) {
  const isTest = api.env('test');
  api.cache.using(() => process.env.NODE_ENV);

  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@app': './src/app',
          '@config': './src/config',
          '@theme': './src/theme',
          '@navigation': './src/navigation',
          '@features': './src/features',
          '@shared': './src/shared',
          '@components': './src/shared/components',
          '@hooks': './src/shared/hooks',
          '@services': './src/shared/services',
          '@utils': './src/shared/utils',
          '@constants': './src/shared/constants',
          '@app-types': './src/shared/types',
          '@assets': './src/assets',
        },
      },
    ],
  ];

  // Keep this LAST — and skip it in tests.
  if (!isTest) {
    plugins.push('react-native-worklets/plugin');
  }

  return {
    presets: ['@react-native/babel-preset'],
    plugins,
  };
};
