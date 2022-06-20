import { createApp } from 'vue'
import App from './App.vue'
import { init } from './init' // 引入init初始化文件，尽可能减少对vue框架文件的修改

const app = createApp(App)
// 初始化相关的属性
init({ app }).then(async ({ router }) => {
  router.isReady().then(() => app.mount('#app'))
})
