<template>
    <div class="nav-collapse">
        <el-icon class="icon-collapse" @click="handleCollapse"><component :is="collapse ? `Expand` :  `Fold`" /></el-icon>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { setting } from '@/utils'

export default defineComponent({
  setup() {
    // 获取左边菜单的收起/展开 状态
    const collapse = ref(setting.getCollapse())
    const handleCollapse = () => {
      // 设置左边菜单收起/展开
      setting.setCollapse()
    }

    return {
      collapse,
      handleCollapse
    }
  }
})
</script>

<style scoped lang="scss">
.nav-collapse {
    flex: 0 0 44px;
    justify-content: center;
}
.icon-collapse{
    font-size:30px;
    cursor: pointer;
    align-items: center;
    margin-top: 6px;
}
</style>
