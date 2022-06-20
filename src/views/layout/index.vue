<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="collapse ? '60px' : '180px'" :class="setting.getTheme(perfer.theme)">
        <CompAside />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <CompHeader />
        </el-header>
        <el-main class="page-content">
          <Main />
          <CompAffix />
        </el-main>
      </el-container>
      <CompDrawer />
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { setting } from '@/utils'
import { Main, CompHeader, CompAside, CompAffix, CompDrawer } from '@/views/layout/components'

export default defineComponent({
  name:'LayoutIndex',
  components: {
    CompHeader,
    CompAside,
    CompAffix,
    CompDrawer,
    Main
  },
  setup() {
    // 获取setting store
    const collapse = setting.getCollapse()
    //获取偏好设置信息
    const perfer:any = reactive(setting.getPerfer());
    return {
      setting,
      collapse,
      perfer
    }
  }
})
</script>

<style scoped lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
  padding: 0 5px;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  padding: 0 15px 10px 15px;
}

</style>
