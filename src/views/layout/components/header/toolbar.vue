<template>
    <div class="nav-toolbar">
        <el-icon class="nav-i-size icon-sty1" title="刷新" v-if="prefer.refresh != 0 " @click="refresh"><Refresh /></el-icon>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { setting } from '@/utils'

export default defineComponent({
  name:"ToolBar",
  setup() {
    const prefer:any = reactive(setting.getPrefer());
    //重新加载页面
    const refresh = () => {
      location.reload();
    }

    return {
      prefer,
      refresh,
    }
  }
})
</script>

<style scoped lang="scss">
  .nav-toolbar {
    flex: 1;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    line-height: 44px;
  }
  .nav-i-size {
    font-size:22px;
  }

  .icon-sty1 {
    margin: 0 8px;
    cursor: pointer;
  }
</style>
