import { createPinia } from 'pinia' // 导入pinia存储store库

// store存储持久化
import piniaPersist from 'pinia-plugin-persist'

// 创建pinia的store实例
const store = createPinia()
store.use(piniaPersist)
export default store
