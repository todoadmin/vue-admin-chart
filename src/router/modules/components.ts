//========================对应的Route component Vue组件模板地址（非赖加载方式）======================
import Layout from '@/views/layout/index.vue'
import LoginLayout from '@/views/auth/login.vue'
import NotFound from '@/views/error/404.vue'
//========================对应的Route component Vue组件模板地址（非赖加载方式）======================

//========================对应的Route component Vue组件模板地址（赖加载方式）======================
//首页
const Home = () => import('@/views/dashboard/index.vue')
//广告橱窗首页
const BannerIndex = () => import('@/views/banner/index/index.vue')
//管理员管理首页
const AdminUser = () => import('@/views/admin/user/index.vue')
//日志管理-管理员操作日志首页
const LogAdminOpr = () => import('@/views/log/admin/operate.vue')
//README
const ReadMeEN = () => import('@/views/dashboard/readme.en.vue')

//========================对应的Route component Vue组件模板地址（赖加载方式）======================

export const componentRouter = {
  'Layout':Layout,
  'LoginLayout':LoginLayout,
  'NotFound':NotFound,
  'Home':Home,
  'BannerIndex':BannerIndex,
  'AdminUser':AdminUser,
  'LogAdminOpr':LogAdminOpr,
  'ReadMeEN':ReadMeEN,
}
