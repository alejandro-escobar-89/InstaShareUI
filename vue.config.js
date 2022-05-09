const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'ui.instashare.com'
  },
  // build: {
    publicPath: '',
    // assetsPublicPath: '',
  // },
});
