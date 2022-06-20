<template>
    <div class="nav-breadcrumb" >
      <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
        <template v-for="item in list.Breadcrumb" :key="item.path">
            <el-breadcrumb-item :to="{path:item.path}">{{item.title}}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

import { setting } from '@/utils'
import { ArrowRight } from '@element-plus/icons-vue'

export default defineComponent({
  setup() {
    const Router = useRouter()
    let list:any = reactive({
      Breadcrumb: []
    })
    // 监听路由变化，对面包屑导航进行数据记录
    watch(() => Router.currentRoute.value, (value:any) => {
      // 获取路由数据转换成面包屑数据
      list.Breadcrumb = setting.getBreadcrumb(value)
    }, { immediate: true, deep: true })
    return {
      list,
      ArrowRight
    }
  }
})
</script>

<style scoped lang="scss">
  .nav-breadcrumb{
    flex: 0 0 40%;
    justify-content: flex-start;
    text-align: left;
  }

  .breadcrumb {
    text-align: center;
    line-height: 42px;
    margin: 0 0 0 30px;
  }
</style>
