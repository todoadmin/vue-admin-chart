/**
 * 常量、相关配置信息
 */
// 请求头验证的 Authorization token 字段名称
export const AUTHORIZATION_TOKEN:string = 'token'
// 路由菜单列表
export const ROUTE_MENU:string = 'menu'

// axios请求的timeout超时时间，多少秒
export const AXIOS_TIMEOUT:number = 5000

// 保存语言的cache storage对应 key
export const LANG_KEY:string = 'LanguageKey'

// 语言选择（先获取ver.lang的语言，如果ver.lang不存在，则获取LANG_DEFAULT常量的值）  zh-cn:中文  en-us:英文  默认为：中文简体
export const LANG_DEFAULT:string = 'zh-cn'
// 默认主题皮肤
export const THEME_DEFAULT = 'theme-default'

// 保存过期时间的token key
export const TOKEN_TIME_KEY = 'ExpireTime'
// 过期时间有效时长
export const TOKEN_TIME_VALUE = 2 * 24 * 60 * 60

// 后台管理列表每页默认多少条
export const TABLE_LIST_SIZE = 20

// 跳转Login的URL地址
export const LOGIN_URL = '/login';
// 跳转Home的URL地址
export const HOME_URL = '/';
// 跳转404URL地址
export const NOTFOUND_URL = '/404';
// 地图map CDN地址   https://geo.datav.aliyun.com/areas_v3/bound  = /amap
export const MAPS_URL = {
    //'china':'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    'china':'/api/assets/json/china.json',
    //'china':'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full',
    '100000':'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
};

//Github项目仓库地址
export const GITHUB_REPO_URL = 'https://github.com/todoadmin/vue-admin-chart'
//Gitee 码云项目仓库地址
export const GITEE_REPO_URL = 'https://gitee.com/todoadmin/vue-admin-chart'
