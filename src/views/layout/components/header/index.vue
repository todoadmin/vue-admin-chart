<template>
  <div class="nav-header">
    <!-- 导入头部左边菜单伸缩组件 -->
    <CompHeaderCollapse v-if="prefer.collapse != 0" />
    <!-- 导入头部面包屑导航栏组件 -->
    <CompHeaderBreadcrumb v-if="prefer.breadcrumb != 0" />
    <!-- 导入头部工具栏组件 -->
    <CompHeaderToolbar />
    <!-- 导入头部用户简介下拉菜单组件 -->
    <CompHeaderProfile />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
// 导入自定义的component组件
import CompHeaderCollapse from './collapse.vue'
import CompHeaderBreadcrumb from './breadcrumb.vue'
import CompHeaderToolbar from './toolbar.vue'
import CompHeaderProfile from './profile.vue'

import { setting } from '@/utils'

export default defineComponent({
  components: {
    CompHeaderCollapse,
    CompHeaderBreadcrumb,
    CompHeaderToolbar,
    CompHeaderProfile
  },
  setup() {
    //获取偏好设置信息
    const prefer:any = reactive(setting.getPrefer());
    return {
      prefer
    }
  }
})
</script>

<style scoped lang="scss">
.nav-header {
  display: flex;
  flex-direction: row;
  height: 42px !important;
  bottom: 0px;
  display: -webkit-flex;
  display: -ms-flexbox;
  width: 100%;
}
</style>
