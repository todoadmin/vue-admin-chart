// 引入配置文件config.js
const conf = require('./config')

const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  parallel: false,
  chainWebpack: config => {
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
    return config
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
