<template>
    <div class="logo">
      <img v-if="!collapse" class="img" src="/logo.png" alt="todoadmin" >
      <img v-else="collapse" class="img" src="/logo-mini.png" alt="todoadmin" >
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { setting } from '@/utils'

export default defineComponent({
  setup() {
    // 获取setting store
    const collapse = setting.getCollapse()
    return {
      collapse
    }
  }
})
</script>

<style scoped lang="scss">
  .logo {
    display: flex;
    height: 35px;
    padding: 8px 0 8px 0;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 2px 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
</style>
