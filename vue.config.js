// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "后台管理";
        return args;
      })
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/style/variables.scss";`
      },
    }
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/proxy': {
        target: 'https://api.apiopen.top',  // target host
        ws: true,  // proxy websockets
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/proxy': ''  // rewrite path
        }
      },
    },
  }
}
