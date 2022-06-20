import { createPinia } from 'pinia' // 导入pinia存储store库

// 如果需要store存储持久化，可以使用pinia-plugin-persist插件：   npm i pinia-plugin-persist --save
import piniaPersist from 'pinia-plugin-persist'

// 创建pinia的store实例
const store = createPinia()
store.use(piniaPersist)
export default store
