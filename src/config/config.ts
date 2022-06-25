/*HTTP Restful API 数据交换地址 */
// 是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'
//获取package.json的属性内容
const pack = require('../../package.json')
//获取package.json的依赖属性
const ver = pack.dependencies

//Production 生产环境
if (isProduction) {
   //http restful API 请求地址
  var CONF_BASE_URL = 'https://api.todoadmin.com'
} else {
  //Dev 开发环境
  //Dev http restful API 请求地址
  var CONF_BASE_URL = 'http://localhost:6868'
}

let prodCDN = {
  css: [
    'https://cdn.bootcdn.net/ajax/libs/element-plus/' + ver['element-plus'].replace(/\~|\^/g, '') + '/index.css',
  ],
  js: [
    'https://cdn.bootcdn.net/ajax/libs/vue/' + ver.vue.replace(/\~|\^/g, '') + '/vue.runtime.global.prod.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/' + ver['vue-router'].replace(/\~|\^/g, '') + '/vue-router.global.prod.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/' + ver.axios.replace(/\~|\^/g, '') + '/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/core-js/' + ver['core-js'].replace(/\~|\^/g, '') + '/minified.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-demi/' + ver['vue-demi'].replace(/\~|\^/g, '') + '/index.iife.min.js',
    'https://cdn.bootcdn.net/ajax/libs/pinia/' + ver.pinia.replace(/\~|\^/g, '') + '/pinia.iife.prod.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-plus/' + ver['element-plus'].replace(/\~|\^/g, '') + '/index.full.min.js',
    'https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js',
    'https://unpkg.com/@element-plus/icons-vue',
    'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.5.1/highlight.min.js',
    //'https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.0.6/dist/index.iife.min.js',
  ],
}

// cdn的方式引入js文件等，以下文件配置不参与打包，使用外部CDN连接方式加载
let externals = {
  vue:'Vue',
  'vue-router': 'VueRouter',
  'vue-demi': 'VueDemi',
  axios:'axios',
  pinia:'Pinia',
  'core-js':'core-js',
  'element-plus':'ElementPlus',
  '@element-plus/icons-vue':'ElementPlusIconsVue',
  'js-md5':'md5',
  //'highlight.js':'highlight',
}

//资源环境
exports.PRODUCTION = isProduction
//静态资源CDN
exports.EXTERNALS = isProduction ? externals : {}
//静态资源CDN
exports.STATIC_CDN = isProduction ? prodCDN : {}
//资源环境
//Api restful 地址
exports.BASE_URL = CONF_BASE_URL
//DEV host 地址
exports.DEV_HOST = 'localhost'
//DEV port 端口
exports.DEV_PORT = '8080'
//DEV proxy
exports.PROXY_ROOT = '/api'
//DEV环境数据使用 mock数据 还是api接口数据
//value:  mock  |  api    default value: api
exports.DEV_DATA_SOURCE = 'mock'
