<template>
  <el-affix>
    <el-button type="warning" icon="Setting" @click="handleDrawer">设置</el-button>
  </el-affix>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { setting } from '@/utils'

export default defineComponent({
  setup() {
    const handleDrawer = () => {
      // 设置右边抽屉工具页面打开/关闭 状态
      setting.setDrawer()
    }
    return {
      handleDrawer,
    }
  }
})
</script>
<style scoped lang="scss">
  .el-affix{
      position: fixed;
      z-index: 200;
      top: 36%;
      right:0;
  }
  .el-button {
      padding: 22px 4px;
      font-size: 16px;
  }
</style>
