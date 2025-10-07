require('dotenv').config();

module.exports = ({ config }) => ({
  ...config,
  expo: {
    ...(config.expo || {}),
    name: (config.expo && config.expo.name) || 'YourAppName',
    slug: (config.expo && config.expo.slug) || 'your-app-slug',
    // ...other config fields (icon, version, etc.)
    extra: {
      ...(config.expo && config.expo.extra),
      SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY,
    },
  },
});
