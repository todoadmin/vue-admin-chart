<template>
    <div class="nav-profile">
        <el-dropdown trigger="hover" @visible-change="handleDropDown" @command="commandDropDownMenu">
          <div class="nav-user-avatar">
            <img :src="data.userInfo.avatar_url" :alt="data.userInfo.username" class="profile-avatar" v-if="data.perfer.avatar != 0">
            <span class="nav-user-name" v-if="data.perfer.username != 0 ">
              {{data.userInfo.username}}
            </span>
            <el-icon class="icon-drop" :span="5" :offset="2" v-if="data.perfer.username != 0 "><component :is="data.dropDown ? `ArrowDownBold` :  `ArrowUpBold`" /></el-icon>
          </div>
          <template #dropdown>
              <el-dropdown-menu>
                  <el-dropdown-item command="center"><el-icon><User /></el-icon>个人中心</el-dropdown-item>
                  <el-dropdown-item command="github"><el-icon><Link /></el-icon>Github仓库</el-dropdown-item>
                  <el-dropdown-item command="gitee"><el-icon><Link /></el-icon>Gitee码云仓库</el-dropdown-item>
                  <el-dropdown-item command="logout"><el-icon><SwitchButton /></el-icon>登出</el-dropdown-item>
              </el-dropdown-menu>
          </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { setting } from '@/utils'
import { G } from '@/config'
import router from '@/router'
import { SAuth } from '@/service'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {

    const data:any = reactive({
      //Table列表相关数据
      table: {
      },
      form: {
        uid: 1,
        username: 'guest'
      },
      //获取偏好设置信息
      perfer: setting.getPerfer(),
      //获取用户名的下拉菜单的收起/展开 状态
      dropDown: setting.getDropDown(),
      //获取用户基本信息
      userInfo: setting.getUserInfo(),
    })

    const handleDropDown = () => {
      // 设置用户名的下拉菜单收起/展开
      setting.setDropDown()
    }
    //下拉菜单子项选中的回调，分别进行对应的功能或跳转
    const commandDropDownMenu = (command:any) => {
      if (command == 'center') {
        router.push('/admin/user/')
      }
      if (command == 'github') {
        window.open(G.GITHUB_REPO_URL,"_blank");
      }
      if (command == 'gitee') {
        window.open(G.GITEE_REPO_URL,"_blank");
      }
      if (command == 'logout') {
        try {
          // 提交数据到请求服务
          SAuth.logout(data.form).then((result : any) => {
            if (result.code === 0) {
              ElMessage.success('登出成功')
              // 路由跳转
              let timeout = setTimeout(() => {
                clearTimeout(timeout)
                router.push(G.LOGIN_URL)
              }, 200)
            } else {
              ElMessage.error(result.message)
            }
          }).catch((err: any) => {
            console.log(err)
            ElMessage.error(err)
          })
        } catch (error) {
          console.log(error,'###---###')
        }
      }
    }
    return {
      data,
      handleDropDown,
      commandDropDownMenu
    }
  }
})
</script>

<style scoped lang="scss">
  .nav-profile {
    flex: 0 0 170px;
    justify-content: center;
    align-items: center;
  }
  .nav-profile2 {
    flex: 0 0 60px;
    justify-content: center;
    align-items: center;
  }
  .nav-user-avatar {
    float:left;
    height: 40px;
  }
  .profile-avatar {
    width: 36px;
    height: 36px;
    float:left;
    cursor: pointer;
    border-radius: 50%;
    margin: 2px 6px 0 0;
  }
  .nav-user-name {
    max-width:80px;
    height: 38px;
    line-height: 38px;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    display:block;
    float:left;
  }

  .icon-drop {
    height: 36px;
    line-height: 36px;
    font-size:16px;
    margin-left: 3px;
    float:left;
  }

</style>
