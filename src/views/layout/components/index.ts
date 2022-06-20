/**
 * 维护component的所有共用组件，以便统一调用
 * 直接调用index.ts文件，相关的组件名即可，不需要调用不通目录下的vue文件
 * @Author: jihua.huang
 * @Since: 2022-03-17
 */
// ==========主模板==========
export { default as Main } from './main.vue'

// ==========左边菜单栏==========
export { default as CompAside } from './aside/index.vue'
export { default as CompAsideSubmenu } from './aside/submenu.vue'

// ==========头部工具栏（收缩、面包屑、工具栏、用户profile、logo、通知信息、tabs页面标签等）==========
// ----------头部Index包含（收缩、面包屑、工具栏、用户profile）----------
export { default as CompHeader } from './header/index.vue'
export { default as CompHeaderLogo } from './header/logo.vue'

// ==========设置（工具箱、消息弹出层等）==========
export { default as CompSettingAlertMessage } from './setting/alert-message.vue'

// ===========回到顶部===============
export { default as CompAffix } from './setting/affix.vue'
export { default as CompDrawer } from './setting/drawer.vue'
