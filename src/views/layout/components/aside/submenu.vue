<template>
    <el-sub-menu :index="menu.path" :key="menu.path" :class="theme">
        <template #title>

            <el-icon v-if="menu.meta.icon"><component :is="menu.meta.icon"/></el-icon>
            <span :hidden="collapse ? true : false">{{ menu.meta.title }}</span>

        </template>
        <template v-if="menu.children.length">
            <template v-for="subitem in menu.children" :key="subitem.path">
                <template v-if="!subitem.children">
                    <el-menu-item v-if="!subitem.meta.hidden" :index="subitem.path" :class="collapse ? theme + ' df-sub-menu collapse-sub-menu' : theme + ' df-sub-menu ' " :key="subitem.path" >

                        <el-icon v-if="subitem.meta.icon"><component :is="subitem.meta.icon"/></el-icon>
                        <span >{{ subitem.meta.title }}</span>

                    </el-menu-item>
                </template>
                <!-- 二级+ 菜单 -->
                <Submenu v-else :menu="subitem" :collapse="collapse" :theme="theme" />
            </template>
        </template>
    </el-sub-menu>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Submenu',
  props: {
    menu: {
      type: Object,
      default: () => ({})
    },
    theme: {
      type: String
    },
    collapse: {
      type: Boolean
    }
  },
  setup() {
    return {
    }
  }
})
</script>
<style scoped lang="scss">
  .el-menu--collapse {
    width:60px;
  }

  .el-menu-item {
    padding-left: 42px !important;
  }
</style>
