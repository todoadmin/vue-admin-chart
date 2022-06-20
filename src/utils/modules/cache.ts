/**
 * 自定义Cache公共函数，主要操作localStorage和sessionStorage
 * @author: Jihua.Huang
 * @date: 2022-3-1
 */
const cache = {
  // ====================localStorage======================
  /**
     * @name: 设置localStorage值
     * @date: 2022-3-1
     * @param:  key   string  cache-key名称
     * @param:  value  string cache值
     */
  setLocalStorage(key: string, value: string) {
    window.localStorage.setItem(key, value)
  },

  /**
     * @name: 获取localStorage值
     * @date: 2022-3-1
     * @param:  key   string  cache-key名称
     */
  getLocalStorage(key: string) {
    const value = window.localStorage.getItem(key)
    return value || ''
  },

  /**
     * @name: 删除localStorage值
     * @date: 2022-3-1
     * @param:  key   string  cache-key名称
     */
  delLocalStorage(key: string) {
    window.localStorage.removeItem(key)
  },

  /**
     * @name: 清除localStorage所有的值
     * @date: 2022-3-1
     * @param:  null
     */
  clearLocalStorage() {
    window.localStorage.clear()
  },


  // ====================sessionStorage======================
  /**
     * @name: 设置sessionStorage值
     * @date: 2022-3-1
     * @param:  key   string  cache名称
     * @param:  value  string cache-key名称
     */
  setSessionStorage(key: string, value: string) {
    window.sessionStorage.setItem(key, value)
  },

  /**
     * @name: 获取sessionStorage值
     * @date: 2022-3-1
     * @param:  key   string  cache-key名称
     */
  getSessionStorage(key: string) {
    const value = window.sessionStorage.getItem(key)
    return value || ''
  },

  /**
     * @name: 删除sessionStorage值
     * @date: 2022-3-1
     * @param:  key   string  cache-key名称
     */
  delSessionStorage(key: string) {
    window.sessionStorage.removeItem(key)
  },

  /**
     * @name: 清除sessionStorage所有的值
     * @date: 2022-3-1
     * @param:  null
     */
  clearSessionStorage() {
    window.sessionStorage.clear()
  }
}
export default cache
