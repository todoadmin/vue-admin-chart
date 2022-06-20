//========================对应的Route component Vue组件模板地址======================
import { componentRouter } from './components';
//========================对应的Route component Vue组件模板地址======================

//静态路由列表
export const routesStatic:any = [
  {
    path: '/',//路径地址
    redirect: '/home',//重定向地址
    component: componentRouter.Layout,//view组件
    meta: {
      title: '首页',//菜单标题名称
      icon: 'House',//菜单图标
      requiresAuth: true,//需认证才能显示该页面
      hidden: false,//该菜单是否在view的menu组件隐藏
      layout: true,//该菜单只作为一级菜单标题显示
      keepAlive:true,//该菜单对应的页面是否保存缓存，用于keep-alive组件设置
      new:false,//是否为新功能
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: componentRouter.Home,
        meta: {
          title: '首页',
          icon: 'House',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:false,//是否为新功能
        }
      }
    ]
  },
  {
    path: '/form',
    redirect: '/form/index',//重定向地址
    name: 'Form',
    component: componentRouter.Layout,
    meta: {
      title: '表单组件',
      icon: 'Paperclip',
      requiresAuth: true,
      layout: true,
      hidden: false,
      keepAlive:true,
      new:false,
    },
    children: [
      {
        path: '/form/index',
        name: 'FormIndex',
        component: () => import('@/views/form/index.vue'),
        meta: {
          title: '表单组件',
          icon: 'Paperclip',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:true,
        },
      }
    ]
  },
  {
    path: '/image',
    redirect: '/image/index',//重定向地址
    name: 'Image',
    component: componentRouter.Layout,
    meta: {
      title: '图片组件',
      icon: 'Paperclip',
      requiresAuth: true,
      layout: true,
      hidden: false,
      keepAlive:true,
      new:false,
    },
    children: [
      {
        path: '/image/index',
        name: 'ImageIndex',
        component: () => import('@/views/form/image.vue'),
        meta: {
          title: '图片组件',
          icon: 'Paperclip',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:true,
        },
      }
    ]
  },
  {
    path: '/other',
    redirect: '/other/index',//重定向地址
    name: 'Other',
    component: componentRouter.Layout,
    meta: {
      title: '其他组件',
      icon: 'Paperclip',
      requiresAuth: true,
      layout: true,
      hidden: false,
      keepAlive:true,
      new:false,
    },
    children: [
      {
        path: '/other/index',
        name: 'OtherIndex',
        component: () => import('@/views/form/other.vue'),
        meta: {
          title: '其他组件',
          icon: 'Paperclip',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:true,
        },
      }
    ]
  },
  {
    path: '/banner',
    name: 'Banner',
    component: componentRouter.Layout,
    meta: {
      title: '广告橱窗',
      icon: 'ScaleToOriginal',
      requiresAuth: true,
      hidden: false,
      keepAlive:true,
      new:false,
    },
    children: [
      {
        path: '/banner/index',
        name: 'BannerIndex',
        component: componentRouter.BannerIndex,
        meta: {
          title: '广告橱窗列表',
          icon: 'ScaleToOriginal',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:true,
        },
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: componentRouter.Layout,
    meta: {
      title: '管理员管理',
      icon: 'User',
      requiresAuth: true,
      hidden: false,
      keepAlive:true,
      new:false,
    },
    children: [
      {
        path: '/admin/user',
        name: 'AdminUser',
        component: componentRouter.AdminUser,
        meta: {
          title: '管理员列表',
          icon: 'User',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:false,
        },
      }
    ]
  },
  {
    path: '/log',
    name: 'Log',
    component: componentRouter.Layout,
    meta: {
      title: '日志管理',
      icon: 'Document',
      requiresAuth: true,
      hidden: false,
      keepAlive:true,
      new:false,
    },
    children: [
      {
        path: '/log/adminopr',
        name: 'LogAdminOpr',
        component: componentRouter.LogAdminOpr,
        meta: {
          title: '管理员操作日志',
          icon: 'Document',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:false,
        }
      }
    ]
  },
  {
    path: '/other',
    name: 'Other',
    component: componentRouter.Layout,
    meta: {
      title: '其他页面',
      icon: 'InfoFilled',
      requiresAuth: true,
      hidden: false,
      keepAlive:true,
      new:false,
    },
    children: [
      {
        path: '/404',
        name: 'NotFound',
        component: componentRouter.NotFound,
        meta: {
          title: '404',
          icon: 'InfoFilled',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:false,
        }
      },
      {
        path: '/README.md',
        name: 'README.cn',
        component: componentRouter.Home,
        meta: {
          title: 'README-中文',
          icon: 'InfoFilled',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:false,
        }
      },
      {
        path: '/README.en.md',
        name: 'README.en',
        component: componentRouter.ReadMeEN,
        meta: {
          title: 'README-En',
          icon: 'InfoFilled',
          requiresAuth: true,
          hidden: false,
          keepAlive:true,
          new:false,
        }
      }
    ]
  }
]

//静态白名单路由列表
export const routesWhite = [
  {
    path: '/404',
    name: '404',
    component: componentRouter.NotFound,
    meta: {
      title: '404-NotFound',
      requiresAuth: false,
      hidden: true,
      layout: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    //component: () => import('@/views/layout/auth/login.vue'),
    component: componentRouter.LoginLayout,
    meta: {
      title: '登录',
      layout: true,
      requiresAuth: false,
      hidden: true,
    }
  },
  {
    path: '/register',
    name: 'Register',
    //component: () => import('@/views/layout/auth/login.vue'),
    component: componentRouter.LoginLayout,
    meta: {
      title: '注册',
      layout: true,
      requiresAuth: false,
      hidden: true,
    }
  }
]

//获取动态路由列表
export const routes = routesStatic.concat(routesWhite)

//获取路由url path地址白名单列表   路由白名单  - 不重定向白名单 ['/404','/login', '/register']
const whiteList = () => {
  let list:any = []
   for (let item of routes) {
    //也可以转换为大写或小写再保存
    list.push(item.path)
  }
  return list
}

//路由在白名单里面
export const existWhite = (path: string) => {
  if (whiteList().indexOf(path) !== -1) {
    return true;
  } else return false;
}
