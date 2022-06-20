/**
 * 封装日志Log（管理员操作日志）相关功能等
 * @author jihua.huang
 * @date 2022-04-10
 */
//引入文件
import { http } from "@/service"; //引入网络请求http
import { HUrl } from "@/config"; //引入http请求URL地址

/**
 * 列表
 * @param params object
 * @returns json object
 */
export const list = async (params : any = {}) => {
  let data: any;
  await http.get(HUrl.LOG_ADMIN_OPR_URL,params).then((result : any) => {
      data = result;
  }).catch((err: any) => {
    http.catch(err)
  });
  return data;
}
