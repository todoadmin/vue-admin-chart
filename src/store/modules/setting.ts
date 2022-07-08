/**
 * 定义基于pinia的store存储
 * 设置相关的store数据（token、菜单、标签等相关）
 * @author jihua.huang
 * @since 2022-03-15
 */
import { defineStore } from 'pinia'

// 创建store，defineStore调用后返回函数，调用该函数获得Store实体
const settingStore = defineStore({
  // 必传的参数，id值，在store中唯一
  id: 'settingStore',
  // 定义数据，返回对象和属性
  state: () => ({
    token: '', // 请求token
    userInfo: '', // 用户基本信息
    prefer: {}, // 设置偏好，包括：主题皮肤等
    collapse: false, // 左边菜单折叠
    drawer: false, // 右边抽屉工具页面
    dropDown: false, // 用户名的下拉菜单折叠
    defaultActive: '', // 默认激活的菜单path -key
  }),
  // 获取store模块的属性
  getters: {
    getToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
    getPrefer: (state) => state.prefer,
    getCollapse: (state) => state.collapse,
    getDrawer: (state) => state.drawer,
    getDropDown: (state) => state.dropDown,
    getDefaultActive: (state) => state.defaultActive,
  },
  // 设置store模块的属性
  actions: {
    // 保存token
    setToken(token: string) {
      this.token = token
    },
    // 保存用户基本信息
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo
    },
    // 设置偏好，包括：主题皮肤等
    setPrefer(prefer: any) {
      this.prefer = prefer
    },
    // 保存左边menu折叠状态
    setCollapse(collapse: boolean) {
      this.collapse = collapse
    },
    // 设置右边抽屉工具页面打开关闭状态
    setDrawer(drawer: boolean) {
      this.drawer = drawer
    },
    // 保存用户名的下拉menu折叠状态
    setDropDown(dropDown: boolean) {
      this.dropDown = dropDown
    },
    // 设置默认激活的菜单path -key
    setDefaultActive(defaultActive: string) {
      this.defaultActive = defaultActive
    },
  },

  // 开启数据缓存  -- 需要在store/index.js中import piniaPluginPersist 插件
  persist: {
    enabled: true, // 开启持久化
    strategies: [
      {
        // key: 'token', //自定义Key，也可以去掉，使用默认值为参数id的值
        storage: localStorage, // 可以为localStorage或者sessionStorage
        // 可以通过paths指定需要持久化的值，其他没有指定的则不会持久化
        paths: [
          'token', 'collapse', 'userInfo', 'dropDown','defaultActive', 'drawer', 'prefer',
        ]
      }
    ]
  }
})

export default settingStore
