/**
 * 数据请求服务接口相关API或函数处理
 * @author jihua.huang
 * @since 2022-03-15
 */
import http from '@/service/http'
import * as SAuth from './moudules/auth/auth'
import * as SAdmin from './moudules/admin/admin'
import * as SLogAdminOpr from './moudules/log/adminopr'
import * as SBanner from './moudules/banner/index'

export {
  http,
  SAuth,
  SAdmin,
  SBanner,
  SLogAdminOpr,
}
