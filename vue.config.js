const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'ui.instashare.com'
  },
  outputDir: './docs',
  publicPath: '',
  // assetsDir: '../src/assets'
});
