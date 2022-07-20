import Mock from 'mockjs'
//引入配置文件config.js
const conf = require("../src/config/config.ts")
// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-500'
})
//读取json文件
function getJsonFile(filePath:string = '') {
    if (!filePath) return {}
  //读取指定json文件
  var json = require('./modules/' + filePath)
  return json
}

// 获取mock的响应数据
const getResponse = (
    url: string,
    type: string,
    data: {}[],
    res: {}[],
) => {
    return {
      url,
      type: type || "get",
      response: (config: any) => {
        return res
      },
    }
}

//axios的请求地址，比如：http://api.xxx.com
const MOCK_BASE_URL = conf.BASE_URL
//api版本目录，比如：v1
const PREFIX_PATH = conf.PREFIX_PATH
const mocks = [
    getResponse(MOCK_BASE_URL + PREFIX_PATH + "/auth/login", "post", [], getJsonFile('login.json')),
    getResponse(MOCK_BASE_URL + PREFIX_PATH + "/auth/logout", "post", [], getJsonFile('comm.json')),
    getResponse(MOCK_BASE_URL + PREFIX_PATH + "/banner/index", "get", [], getJsonFile('bannerIndex.json')),
    getResponse(MOCK_BASE_URL + PREFIX_PATH + "/admin/user", "get", [], getJsonFile('adminUser.json')),
    getResponse(MOCK_BASE_URL + PREFIX_PATH + "/log/adminopr", "get", [], getJsonFile('logAdminopr.json')),
]

export const mockXHR = () => {
    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || "get", i.response)
    }
}