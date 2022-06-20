<template #default>
  <div>
    <router-view v-slot="{ Component, route }">
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name:'Main',
  setup() {
    return {
      
    }
  }
})
</script>

<style scoped lang="scss">
</style>
