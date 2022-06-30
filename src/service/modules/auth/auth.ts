/**
 * 封装登陆/登出/验证码/token等
 * @author jihua.huang
 * @date 2022-03-09
 */
//引入文件
import { http } from "@/service"; //引入网络请求http
import { G,HUrl } from "@/config"; //引入http请求URL地址
//导入 store的存储模块
import { settingStore } from '@/store'
// 导入cache模块
import { cache } from '@/utils'

/**
 * 用户登陆
 * @param params object
 * @returns json object
 */
export const login = async (params : any) => {
    // 获取setting store
    const settStore = settingStore()

    let data: any;
    await http.post(HUrl.LOGIN_URL,params).then((result : any) => {
      //只处理code = 0的数据
      if (result.code === 0) {
      //type:0 为ping 心跳，不需处理，WS数据
      if (result.type !== 0) {
        // 设置token，并写入到store中
        let token = result.token || ''
        //Pinia 保存一份
        settStore.setToken(token)
        //LocalStorage原始也保存一份
        cache.setLocalStorage(G.AUTHORIZATION_TOKEN,token)
      }

      // 设置用户基本信息，并写入到store中
      let userInfo = result.data.userInfo
      if (userInfo) {
        settStore.setUserInfo(userInfo)
      }
    }
    data = result;
  }).catch((err: any) => {
    http.catch(err)
  });
  return data;
}


/**
 * 用户登出（需要清理相关的数据和缓存，已经初始化某些数据）
 * @param params object
 * @returns json object
 */
export const logout = async (params : any) => {
  let data: any;
  await http.post(HUrl.LOGOUT_URL,params).then((result : any) => {
    //退出登陆要清理相关的localstrage和session缓存
    //清理session
    //清除localStorage所有的值
    cache.clearLocalStorage()
    data = result;
  }).catch((err: any) => {
    http.catch(err)
  });
  return data;
}
