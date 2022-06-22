<template>
  <div class="login-container">
    <transition name="el-fade-in-out">
    <el-form ref="formRef" :model="data.form" :rules="data.rules" :label-width="data.property.labelWidth"  :size="data.property.formSize" class="login-form" v-show="!data.loginSucc">
      <!-- 头像 -->
      <el-form-item>
        <div class="login_avatar">
          <img src="/assets/images/login_avatar.jpg" alt="">
        </div>
      </el-form-item>
      <el-form-item>
        <div class="title">
          TodoAdmin管理系统<span class="title-min">-base</span>
        </div>
      </el-form-item>
 
      <el-form-item prop="username">
        <el-input v-model="data.form.username" placeholder="用户名" type="text"  auto-complete="on" >
          <template #prepend>
              <el-icon :size="20"><Avatar /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="data.form.password" placeholder="密码" type="password" show-password autocomplete="off" @keyup.enter.native="loginSubmit" >
          <template #prepend>
              <el-icon :size="20"><Key /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginSubmit" :disabled="data.isSubmit" class="btn-submit">登录</el-button>
      </el-form-item>
      <el-form-item>
        <div class="tips">
          <span>如果还没有账号？<a href="javascript:;" class="register" @click="register">注册</a></span>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="repo">
          <span><a :href="data.table.github" class="repo-link" target="_blank">Github Repo</a></span>
          <span><a :href="data.table.gitee" class="repo-link" target="_blank">Gitee Repo</a></span>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="copyright">
          Copyright (c) {{data.table.year}}, Todoadmin.com
        </div>
      </el-form-item>
    </el-form>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import router from '@/router'
import { cache } from '@/utils'
import type { FormInstance } from 'element-plus'
import { ElMessage,ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { G } from '@/config'
import { SAuth } from '@/service'
import md5 from 'js-md5'

export default defineComponent({
  name:'Login',
  setup() {
    //获取组件的ref
    const formRef:any = ref<FormInstance>()
    //清除localStorage所有的值
    cache.clearLocalStorage()
    let date:any = new Date()
    let year:string = date.getFullYear()

    const data:any = reactive({
      //Table列表相关数据
      table: {
        github: G.GITHUB_REPO_URL,
        gitee: G.GITEE_REPO_URL,
        year:year,
      },
      //Form表单相关数据
      form: {
        username: '',
        password: '',
      },
      reform: {
        password: '',
      },
      //属性设置
      property: {
        labelWidth: '80px',
        fullscreen: false,
        closeModal: false,
        formSize: 'default',
      },
      // form表单规则
      rules: {
        username: [
          { required: true, message: '用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '用户名' + ' 3 ~ 20', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '输入密码有误',  trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度' + ' 6 ~ 16', trigger: 'blur' },
        ],
      },
      //是否显示局部loading效果
      loading: false,
      // 已经提交过请求登陆，提交按钮变灰
      isSubmit: false,
      // 是否登陆成功，如果登陆成功，则隐藏form控件
      loginSucc:false,
    })

    // 点击按钮登陆
    const loginSubmit = async () => {
      if (!formRef.value!) return
      try {
        // 验证表单
        await formRef.value!.validate((valid: any) => {
          if (valid) {
            data.isSubmit = true
            //  保存提交前未md5的值
            data.reform.password = data.form.password
            //对密码进行MD5的加密后传输
            data.form.password = md5(data.form.password)
            // 提交数据到请求服务
            SAuth.login(data.form).then((result : any) => {
              data.form.password = data.reform.password
              if (result.code === 0) {
                data.loginSucc = true
                ElMessage.success('登录成功')
                let timeout = setTimeout(() => {
                  ElMessage.warning('即将跳到首页')
                  //重置表单
                  formRef.value.resetFields()
                  clearTimeout(timeout)
                  router.push(G.HOME_URL)
                }, 300)
              } else {
                data.isSubmit = false
                ElMessage.error(result.message)
              }
            }).catch((err: any) => {
              data.form.password = data.reform.password
              data.isSubmit = false
              console.log(err)
              ElMessage.error(err)
            })
          } else {
            console.log('fail')
            ElMessage.error('登录失败')
          }
        })
      } catch (error) {
        console.log(error)
      }
    }

    // 重置表单
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    // 注册用户
    const register = () => {
      ElMessageBox.alert('注册用户通道暂时不开放，请关注公告！', '提示', {
        confirmButtonText: '关闭',
        callback: (action: Action) => {
          
        },
      })
    }

    return {
      formRef,
      data,
      loginSubmit,
      resetForm,
      register
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-form .el-form-item__content) {
    display: inline;
    margin-left: 0px !important;
}
.login-container {
  margin: 0 auto;
  height: 100%;
  width: 100%;
  background: url('~@/assets/images/bg1.jpg') no-repeat;
  overflow: hidden;
   // 头像
  .login_avatar {
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 1px solid #409eff;
    box-shadow: 0 0 10px #409eff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
 
  .login-form {
    margin: 0 auto;
    position: relative;
    width: 600px;
    max-width: 90%;
    padding: 100px 0 230px 0;
    overflow: hidden;
    .btn-submit {
      width:100%;
      padding:5px 0;
      color:#fff;
      font-size:18px;
    }
  }
  .title {
    margin: 0 auto 20px auto;
    font-size: 28px;
    text-align: center;
    font-weight: 600;
    color:#f2f2f2;
  }
  .title-min {
    padding-left: 3px;
    color:#fff;
    font-size:14px;
    font-weight: 500;
  }
  .tips {
    margin: 0 auto;
    font-size: 18px;
    text-align: center;
    color: #666;
    margin-bottom: 10px;
  }
  .repo {
    margin: 0 auto;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    span {
      margin: 0 15px;
    }
  }
  .repo-link {
    cursor: pointer;
    text-decoration: underline;
    font-size:22px;
    color:#1145c8;
  }
  .repo-link:hover {
    color:#f7f7fc;
  }
  .register {
    cursor: pointer;
    text-decoration: none;
    font-size:20px;
    color:#345cc0;
  }
  .copyright {
    color:#fff;
    font-size:14px;
    margin:0 auto;
    text-align: center;
  }
}
</style>