/**
 * 设置相关功能
 * @author jihua.huang
 * @since 2022-03-14
*/
import { G } from '@/config'
import { storeToRefs } from 'pinia'
import { settingStore } from '@/store' // 引入setting permission的store

/**
 * 初始化相关pinia store对象
 * @return {*}
 */
const initStore = () => {
  const settStore = settingStore()

  // 设置为响应数据
  const refSettStore = storeToRefs(settingStore())
  return { settStore, refSettStore }
}

/**
 * 设置左边菜单收起/展开
 * @returns bool
 */
export function setCollapse() {
  let collapse = initStore().settStore.collapse || false
  initStore().settStore.setCollapse(!collapse)
}

/**
 * 获取左边菜单的收起/展开 状态
 * @returns bool
 */
export function getCollapse() {
  const { collapse } = initStore().refSettStore
  return collapse
}

/**
 * 设置右边抽屉工具页面打开/关闭 状态
 * @returns bool
 */
export function setDrawer() {
  let drawer = initStore().settStore.drawer || false
  initStore().settStore.setDrawer(!drawer)
}

/**
 * 获取设置右边抽屉工具页面打开/关闭 状态
 * @returns bool
 */
export function getDrawer() {
  const { drawer } = initStore().refSettStore
  return drawer
}

/**
 * 设置用户名的下拉菜单收起/展开
 * @returns bool
 */
export function setDropDown() {
  let dropDown = initStore().settStore.dropDown || false
  initStore().settStore.setDropDown(!dropDown)
}

/**
 * 获取用户名的下拉菜单收起/展开 状态
 * @returns bool
 */
export function getDropDown() {
  const { dropDown } = initStore().refSettStore
  return dropDown
}

/**
 * 获取用户的基本信息
 * @returns object
 */
export function getUserInfo() {
  const { userInfo } = initStore().refSettStore
  const info : any = userInfo
  return info.value
}

/**
 * 设置默认激活的菜单path -key
 * @returns number
 */
export function setDefaultActive(path: string) {
  if (path) {
    initStore().settStore.setDefaultActive(path)
  }
  return true
}

/**
 * 获取默认激活的菜单path -key
 * @returns number
 */
export function getDefaultActive() {
  const { defaultActive } = initStore().refSettStore
  return defaultActive
}

/**
 * 获取路由数据转换成面包屑数据
 * @returns number
 */
export const getBreadcrumb = (route: any) => {
  let list:any = []
  const matched:any = route.matched || []
  const home = ['/', '/home']
  const homeObj = {
    path: '/home',
    name: 'Home',
    title: '首页',
    link: true
  }
  // 获取数组长度
  const length = Object.keys(matched).length
  if (length >= 1) {
    Object.values(matched).forEach((item:any) => {
      if (item.path && item.path !== '/') {
        let breadcrumb:any = {
          path: item.path,
          name: item.name,
          title: item.meta.title
        }
        list.push(breadcrumb)
      }
    })
  }
  return list
}

/**
 * 设置偏好设置信息
 * @returns number
 */
export function setPerfer(data: any) {
  // 如果数据值为空，则不处理
  if (Object.keys(data).length < 1) {
    return
  }

  // 获取store里的perfer数据
  const perfer = initStore().refSettStore.perfer
  let newData:any = {}
  // 存在数据的处理
  if (Object.keys(perfer.value).length >= 1) {
    // 合并对象
    newData = Object.assign(perfer.value, data)
  } else {
    newData = data
  }
  if (newData) {
    // 保存数据到store中
    initStore().settStore.setPerfer(newData)
  }
  return true
}

/**
 * 获取偏好设置信息
 * @returns number
 */
export const getPerfer = () => {
  const { perfer } = initStore().refSettStore
  // 如果不存在主题皮肤，则使用默认皮肤
  return perfer
}

/**
 * 获取偏好设置信息
 * @returns number
 */
export const getTheme = (val:any) => {
  if (typeof val === 'undefined' || !val) {
    // 如果不存在主题皮肤，则使用默认皮肤
    return G.THEME_DEFAULT
  } else {
    return val
  }
}
/**
 * 获取某个偏好设置的开关信息信息
 * @returns number
 */
export const getOnOff = (val:any) => {
  if (typeof val === 'undefined') {
    // 如果不存在key，则使用默认 1
    return 1
  } else {
    return parseInt(val) === 0 ? 0 : 1
  }
}
