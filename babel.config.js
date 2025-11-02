/* What this file does: This is the cofing file for Babel (the JS compiler). babel-preset-expo
adds all the standard features. The crucial part that is added is 'react-native-reanimated/plugin'
This plugin transform the code (like useAnimatedStyle) into a format that can run smoothly on
the native UI thread, which is what makes animations and gestures (like the bottom sheet) fast.
IT MUST be the LAST plugin listed. */

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // IMPORTANT: This plugin must be listed last.
      'react-native-reanimated/plugin',
    ],
  };
};