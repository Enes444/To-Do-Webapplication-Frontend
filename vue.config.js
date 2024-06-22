const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://my-springboot-app.onrender.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
});
