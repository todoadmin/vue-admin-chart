<template>
  <CompSettingAlertMessage />
  <div class="markdown-body">
    <md />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CompSettingAlertMessage } from '@/views/layout/components/'
// markdown样式
import 'github-markdown-css'
// 代码高亮
import 'highlight.js/styles/github.css'
import md from '../../../README.md'

export default defineComponent({
  name: 'Home',
  components: {
    CompSettingAlertMessage,
    md
  },
  setup() {
    return {
    }
  }
})
</script>

<style scoped lang="scss">
</style>