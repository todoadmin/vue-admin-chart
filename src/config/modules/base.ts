/*HTTP Restful API 数据交换地址 */
//Production 生产环境
if (process.env.NODE_ENV === 'production') {
   //http restful API 请求地址
   exports.BASE_URL = 'https://api.todoadmin.com'
} else {
  //Dev开发环境 http restful API 请求地址
  exports.BASE_URL = 'http://localhost:8080'
}
/** 后缀地址（可以为版本目录，如：/v1） */
exports.PREFIX_PATH = '/v1'

//DEV host 地址
exports.DEV_HOST = 'localhost'
//DEV port 端口
exports.DEV_PORT = '8080'
//DEV proxy
exports.PROXY_ROOT = '/api'
//DEV环境数据使用 mock数据 还是api接口数据
//value:  mock  |  api
exports.DEV_DATA_SOURCE = 'mock'
