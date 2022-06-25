import { createRouter,createWebHistory } from 'vue-router'

import { routes, existWhite } from './modules/routes'
import { ElMessage } from 'element-plus'
import { cache } from '@/utils';
import { G } from '@/config'

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航路由守卫
router.beforeEach((to:any, from:any, next:any) => {
  try {
    // 路由在白名单里面
    if (existWhite(to.path)) {
      next()
    } else {
      const token = cache.getLocalStorage(G.AUTHORIZATION_TOKEN)
      // 如果token或userInfo为空、null、{}则跳转到指定login页面进行登陆
      if (!token) {
        // 保存我们所在的位置，以便以后再来
        next(G.LOGIN_URL);
      } else {
        if (to.matched.length === 0) {
          ElMessage.error('找不到路由-NotFound Router...')
          from.name ? next({ path: from.path, query: from.query }) : next(G.NOTFOUND_URL)
        } else {
          next()
        }
      }
    }
  } catch (error) {
    throw error
  }
})

// 路由跳转后钩子函数中 - 执行进度条加载结束
router.afterEach(() => {
})

export default router
