/**
 * 配置CDN相关  setting CDN
 */
//获取package.json的属性内容
const pack = require('../../../package.json')
//获取package.json的依赖属性
const ver = pack.dependencies
//生产环境相关的CDN连接地址 production cdn link
exports.prodCDN = {
    css: [
        'https://cdn.bootcdn.net/ajax/libs/element-plus/' + ver['element-plus'].replace(/\~|\^/g, '') + '/index.css',
        'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/' + ver['github-markdown-css'].replace(/\~|\^/g, '') + '/github-markdown.min.css',
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
        //'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.5.1/highlight.min.js',
        'https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.0.6/dist/index.iife.min.js',
    ],
}

//DEV环境相关的CDN连接地址 dev cdn link
exports.devCDN = {
    css: [
        'https://cdn.bootcdn.net/ajax/libs/element-plus/' + ver['element-plus'].replace(/\~|\^/g, '') + '/index.css',
        'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/' + ver['github-markdown-css'].replace(/\~|\^/g, '') + '/github-markdown.min.css',
    ],
    js: [
    ],
}
  
//cdn的方式引入js文件等，以下文件配置不参与打包，使用外部CDN连接方式加载
exports.PROD_EXTERNALS = {
    vue:'Vue',
    'vue-router': 'VueRouter',
    'vue-demi': 'VueDemi',
    axios:'axios',
    pinia:'Pinia',
    'core-js':'core-js',
    'element-plus':'ElementPlus',
    '@element-plus/icons-vue':'ElementPlusIconsVue',
    'js-md5':'md5',
    //'highlight.js':'hljs',
}

exports.DEV_EXTERNALS = {}
