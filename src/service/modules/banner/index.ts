/**
 * 封装广告橱窗功能、比如：列表、添加、删除、修改、审核功能等
 * @author jihua.huang
 * @date 2022-04-26
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
  await http.get(HUrl.BANNER_URL,params).then((result : any) => {
      data = result;
  }).catch((err: any) => {
    http.catch(err)
  });
  return data;
}
