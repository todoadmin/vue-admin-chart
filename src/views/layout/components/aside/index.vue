<template>
  <div class="nav-menu theme-default">
    <!-- 导入头部Logo组件 -->
    <CompHeaderLogo />
    <el-menu
      class="el-menu-vertical theme-default"
      :default-active="(defaultActive === '/home') ? '/' : defaultActive"
      :collapse="collapse"
      :router="true"
      :unique-opened="true">
        <template v-for="item in menu" :key="item.path">
          <!-- 一级菜单 -->
          <template v-if="item.meta.layout">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" :key="item.path">
              <el-icon v-if="item.meta.icon"><component :is="item.meta.icon"/></el-icon>
              <span :hidden="collapse ? true : false">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
          <!-- 二级+ 菜单 -->
          <CompAsideSubmenu v-else :menu="item" :collapse="collapse" :theme="theme" />
        </template>
      </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { setting } from '@/utils'
import { routes } from '@/router/modules/routes'
// 导入自定义的component组件
import CompHeaderLogo from '../header/logo.vue'
// 导入自定义的component组件
import CompAsideSubmenu from '../aside/submenu.vue'

export default defineComponent({
  components: {
    CompHeaderLogo, CompAsideSubmenu
  },
  setup() {
    const theme = 'theme-default';
    const collapse = setting.getCollapse()
    const Router = useRouter()
    // 当前选中的路由，menu进行高亮显示
    const defaultActive = ref(setting.getDefaultActive())

    // 监听路由变化，对菜单进行切换和高亮
    watch(() => Router.currentRoute.value, (item:any) => {
      const pathStr:string = item.path
      if (!pathStr.includes('login')) {
        setting.setDefaultActive(item.path)
      }
    }, { immediate: true, deep: true })

    const menu:any = routes.filter((item:any) => {
      return !item.meta.hidden
    })
    return {
      setting,
      menu,
      theme,
      defaultActive,
      collapse,
    }
  }
})
</script>
<style scoped lang="scss">
.nav-menu {
  .el-menu-vertical:not(.el-menu--collapse) {
    min-height: 400px;
    transition: 0.1s;
    width: 100%;
    height: calc(100% - 48px);
  }
  .el-menu--collapse {
    width:60px;
  }

  .el-menu {
    border-right: none;
  }
}

</style>
