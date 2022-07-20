/**
 * 接口请求地址配置信息
 * @author jihua.huang
 * @since 2022-03-19
 */
//引入基本配置文件base.js
const BASE = require("./base.ts")

//HTTP RESTFUL根地址
export const HTTP_BASE_URL = BASE.BASE_URL

/** 后缀地址（可以为版本目录，如：/v1） */
export const BASE_PREFIX = HTTP_BASE_URL + BASE.PREFIX_PATH

/** 用户登陆提交数据接口 */
export const LOGIN_URL = BASE_PREFIX + '/auth/login'
/** 用户登出提交数据接口 */
export const LOGOUT_URL = BASE_PREFIX + '/auth/logout'
/** 管理员管理提交数据接口 */
export const ADMIN_URL = BASE_PREFIX + '/admin/user'

/** 广告橱窗数据接口 */
export const BANNER_URL = BASE_PREFIX + '/banner/index'

/** 管理员操作日志数据接口 */
export const LOG_ADMIN_OPR_URL = BASE_PREFIX + '/log/adminopr'