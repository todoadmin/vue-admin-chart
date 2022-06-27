/**
 * 数据请求服务接口相关API或函数处理
 * @author jihua.huang
 * @since 2022-03-15
 */
import http from '@/service/http'
import * as SAuth from './modules/auth/auth'
import * as SAdmin from './modules/admin/admin'
import * as SLogAdminOpr from './modules/log/adminopr'
import * as SBanner from './modules/banner/index'

export {
  http,
  SAuth,
  SAdmin,
  SBanner,
  SLogAdminOpr,
}
