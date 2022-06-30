// 引入配置文件config.js
const conf = require('./src/config/config.ts')

const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  productionSourceMap: false, //不生成map文件
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  chainWebpack: config => {
    // Markdown文件
    config.module.rule('md')
    .test(/\.md/)
    .use('vue-loader')
    .loader('vue-loader')
    .end()
    .use('vue-markdown-loader')
    .loader('vue-markdown-loader/lib/markdown-compiler')
    .options({
        raw: true
    })
    // 导入cdn静态文件连接 来自config.ts
    config.plugin('html').tap(args => {
      args[0].cdn = conf.STATIC_CDN
      return args
    })
    if (conf.PRODUCTION) {
      // 删除预加载优化
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      // 压缩优化
      config.optimization.minimize(true)
      // 分割优化
      config.optimization.splitChunks({
        chunks: 'all'
      })
      // 清除生成环境的console.log输出
      config.optimization
      .minimizer('terser')
      .tap(args => {
        Object.assign(args[0].terserOptions.compress, {
          pure_funcs: ['console.log']
        })
        return args
      })
    }
  },
  configureWebpack: {
    // cdn的方式引入js文件等
    externals: conf.EXTERNALS,
    optimization: {
      splitChunks: {
        cacheGroups: {
          // node_modules目录下的库剥离
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          // 公用|自定义模块剥离
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/](utils|config|service|router|store|directive)[\\/]/,
            name: 'common',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  },
  devServer: {
    host: conf.DEV_HOST, // dev环境主机地址
    port: conf.DEV_PORT, // dev环境默认端口
    proxy: {
      [conf.PROXY_ROOT]: {
        target: conf.BASE_URL, // 设置地址代替axios的BASE_URL
        ws: true, // 代理 websocket
        changeOrigin: true, // 跨域
        secure: true, // https接口
        // 路径重写
        pathRewrite: {
          ['^${conf.PROXY_ROOT}']: '/'
        }
      }
    }
  }
})
