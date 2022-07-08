<template>
  <el-drawer v-model="data.drawer" title="面板设置" :with-header="true" size="300px">
    <el-form :model="data.form" label-width="100px">
      <el-form-item label="语言">
        <el-select v-model="data.form.lang" size="default" placeholder="选择语言">
          <el-option label="默认（中文）" value="zh-cn" />
        </el-select>
      </el-form-item>

      <el-divider />

      <el-form-item label="主题">
        <el-select v-model="data.form.theme" size="default" placeholder="选择主题" >
          <el-option label="默认" value="theme-default" />
        </el-select>
      </el-form-item>

      <el-form-item label="面包屑导航">
        <el-radio-group v-model="data.form.breadcrumb" size="default" @change="turnOnOf($event,'breadcrumb')">
          <el-radio-button label="1">开启</el-radio-button>
          <el-radio-button label="0">关闭</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="菜单伸缩">
        <el-radio-group v-model="data.form.collapse" size="default" @change="turnOnOf($event,'collapse')">
          <el-radio-button label="1">开启</el-radio-button>
          <el-radio-button label="0">关闭</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="刷新按钮">
        <el-radio-group v-model="data.form.refresh" size="default" @change="turnOnOf($event,'refresh')">
          <el-radio-button label="1">开启</el-radio-button>
          <el-radio-button label="0">关闭</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { setting, comm } from '@/utils'
import { G } from '@/config'

export default defineComponent({
  setup() {
    const prefer:any = reactive(setting.getPrefer());
    
    //常用的响应数据
    const data:any = reactive({
      form: {
        lang: G.LANG_DEFAULT,//主题皮肤，不选为默认皮肤
        theme: comm.toStr(prefer.value.theme) ? prefer.value.theme : G.THEME_DEFAULT,//主题皮肤，不选为默认皮肤
        breadcrumb: setting.getOnOff(prefer.value.breadcrumb) ? 1 : 0,//是否展示面包屑导航
        collapse: setting.getOnOff(prefer.value.collapse) ? 1 : 0,//是否展示左边menu菜单收缩图标
        refresh: setting.getOnOff(prefer.value.refresh) ?  1 : 0,//是否展示头部工具栏的刷新图标
        username: setting.getOnOff(prefer.value.username) ?  1 : 0,//是否展示头部我的用户名
        avatar: setting.getOnOff(prefer.value.avatar) ?  1 : 0,//是否展示头部我的头像
      },
      drawer: setting.getDrawer()
    })

    //保存功能设置面板的数据，包括：改变主题皮肤、图标显示、导航Tabs、显示/隐藏 面包屑导航等
    const turnOnOf = (val:number,name:string) => {
      let prefer:any = {}
      prefer[name] = val
      setting.setPrefer(prefer);
    }
    
    return {
      data,
      turnOnOf,
    }
  }
})
</script>

<style scoped lang="scss">

.el-divider {
  margin:40px 0;
}
.nav-i-size {
  font-size:18px;
}
.icon-sty1 {
  margin: 0 8px;
  cursor: pointer;
  color:#333;
}
</style>
