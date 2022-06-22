/*HTTP Restful API 数据交换地址 */
//Production 生产环境
if (process.env.NODE_ENV === 'production') {
   //http restful API 请求地址
  var CONF_BASE_URL = 'https://api.xxx.com'
} else {
  //Dev 开发环境
  //Dev http restful API 请求地址
  var CONF_BASE_URL = 'http://localhost:6868'
}
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