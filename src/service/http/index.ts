/**
 * 封装axios网络请求
 */
 import axios from "axios"
 import EventEmitter from 'events'
 //import cache from '@/utils/cache' //引入cache
 import { G } from '@/config'   //引入常量和配置信息
 import { ElLoading } from 'element-plus'
// 导入模块
import { cache } from '@/utils';
import { responseCode } from './code';

 //定义一个异常信息接口，返回的数据
interface IException {
    code : number,
    message: string
}

const IExceptionData: IException = {
    code: -1,
    message: '#网络异常-Net Exception#'
}

 let loading:any = null;
 class Request extends EventEmitter {
    constructor(){
        super();
        this.interceptors()
    }

    /**
     * 数据加载动画效果
     */
    startLoading(value:string = '') {
        if (value) {
            loading = ElLoading.service({
                target: value,//局部刷新动画，填写class   .notice-tabs
                lock: false,
                fullscreen: false,
                text: '加载中...',
                background: 'rgba(0,0,0,0.5)'
            })
        } else {
            loading = ElLoading.service({
                lock: false,
                text: '拼命加载中...',
                background: 'rgba(0,0,0,0.7)'
            })
        }
        return loading
    }
    /**
     * 数据停止加载动画效果
     */
    endLoading() {
        if (loading) {
            loading.close()
        }
    }

    /**
     * 拦截器处理
     */
    interceptors() {
        if (Object.keys(G.AXIOS_TIMEOUT).length != 0) {
            //axios.default.timeout = global.AXIOS_TIMEOUT
        }
        // 添加请求拦截器
        axios.interceptors.request.use(
            (config) => {
                let paramsData = config.params || {}
                //if (typeof config.params.getBox === 'undefined') {
                if (!paramsData.hasOwnProperty('getBox')) {
                    //数据加载动画效果（全屏loading）
                    this.startLoading()
                } else {
                    if (config.params.getBox) {
                        //数据加载动画效果（局部loading）
                        this.startLoading(config.params.getBox)
                        //剔除该key
                        delete config.params.getBox
                    }
                }
                
                //如果未定义config，则默认为空
                if (!config) {
                    config = {};
                }
                if (!config.headers) {
                    config.headers = {};
                }

                const token = cache.getLocalStorage(G.AUTHORIZATION_TOKEN)
                let Authorization:string = ''
                if (token.length >= 20) {
                    Authorization = 'Bearer ' + token;
                }
                // 为请求头对象，添加 Token 验证的 Authorization 字段
                config.headers.Authorization = Authorization;
                /* config.headers.Name = info.getName;
                config.headers.Device = info.getDevice();
                config.headers.Browser = info.getBrowser();
                config.headers.Version = info.getVersion;
                config.headers.OS = info.getOS();
                config.headers.Network = info.getNetwork(); */
                //config.headers['Access-Control-Allow-Origin'] = '*';
                // 发送请求前的处理
                return config
            },
            error => {
                this.error(error,'request')
            }
        );
        // 添加响应拦截器
        axios.interceptors.response.use(
            // 请求响应的处理
            response => {
                setTimeout(() => {
                    //数据结束加载动画效果
                    this.endLoading();
                }, 60);
                if (response.hasOwnProperty('status')) {
                    const status = response.status;
                    //code 为正常code范围值，响应成功
                    if ((status >= 200 && status < 300) || status === 304) {
                        this.code(response.data)
                        return Promise.resolve(response.data);
                    } else {
                        // 响应错误逻辑处理 5xx 4xx 等等
                        this.error(response,'response#1')
                        //return Promise.reject(response)
                    }
                } else {
                    this.error(response,'response#2')
                }
            },
            // 响应错误的处理
            error => {
                // 状态码
                this.error(error,'response#3')
                //return Promise.reject(error)
            }
        );
    }
    get(url : string,params : any) {
        return axios({
            method: 'get',
            url,
            params,
        });
    }
    //在某个div里显示loading加载
    getBox(url : string,params : any,box : any = {}) {
        params['getBox'] = box['getBox'] || ''
        return axios({
            method: 'get',
            url,
            params
        });
    }

    /**
     * upload 请求
     * @param { String } url Url
     * @param { Object } params 参数/数据
     * @param { Object } options 设置header 相关属性、timeout、以及其他http request参数
     */
    upload(url : string,data : any = '') {
        return axios({
            method: 'post',
            url,
            headers: { 'Content-Type': 'multipart/form-data' },
            data
        });
    }

    /**
     * Axios Post 请求
     * @param { String } url Url
     * @param { Object } params 参数/数据
     * @param { Object } options 设置header 相关属性、timeout、以及其他http request参数
     */
    post(url : string,params : any = '',options : any = null) {
        let data = this.reqParams(params,options)
        return axios({
            method: 'post',
            url,
            data
        });
    }

    /**
     * Axios Delete 请求
     * @param { String } url Url
     * @param { Object } params 参数/数据
     * @param { Object } options 设置header 相关属性、timeout、以及其他http request参数
     */
    delete(url : string,params : any = '',options : any = null) {
        let data = this.reqParams(params,options)
        return axios({
            method: 'delete',
            url,
            data
        });
    }

    /**
     * Axios Put 请求
     * @param { String } url Url
     * @param { Object } params 参数/数据
     * @param { Object } options 设置header 相关属性、timeout、以及其他http request参数
     */
    put(url : string,params : any = '',options: any = null) {
        let data = this.reqParams(params,options)
        return axios({
            method: 'put',
            url,
            data
        });
    }

    /**
     * Axios Patch 请求
     * @param { String } url Url
     * @param { Object } params 参数/数据
     * @param { Object } options 设置header 相关属性、timeout、以及其他http request参数
     */
    patch(url : string,params : any = '',options : any = null) {
        let data = this.reqParams(params,options)
        return axios({
            method: 'patch',
            url,
            data
        });
    }

    /**
     * 处理请求参数
     * @param { Object } params 参数/数据
     * @param { Object } options 设置header 相关属性、timeout、以及其他http request参数
     */
    reqParams(params : any, options : any = null) {
        if (typeof params === 'object') {
            if (Object.keys(params).length < 1) {
                params = {}
            }
            //过滤 {} null [] '' 等长度少于4的
            if (JSON.stringify(options).length > 4) {
                Object.assign(params, options);
            }
            return params
        }
        return {}
    }
    
    /**
     * 统一处理code返回值的函数（如果需要对code某些返回值进行拦截处理）
     * @param {*} res
     * @param {*} resolve
     * @param {*} reject
     */
    code(res : any) {
        //统一处理一些特殊的code值，比如权限不足，token过期，接口已关闭，维护中等相关的状态
        if (res.hasOwnProperty('code')) {
            //如果返回值的code中存在responseCode的内容，则进行处理
            if (responseCode.includes(res.code)) {
                let message:any
                if (res.hasOwnProperty('message')) {
                    message = res.message
                }
            }
        }
   }

    /**
     * 成功回调函数
     * @param {*} res
     * @param {*} resolve
     * @param {*} reject
     */
     success(res : any, resolve : any,reject : any) {
         if (res.hasOwnProperty('data')) {
             //统一处理一些特俗的code值，比如权限不足，token过期，接口已关闭，维护中等相关的状态
            if (res.data) {
                resolve(res)
            } else {
                //失败回调
                this.fail(res,reject)
            }
        } else {
            resolve(res)
        }
    }


    /**
     * 失败回调函数
     * @param {*} res 数据
     * @param {*} reject
     */
    fail(res : any, reject : any) {
        console.log(res,'+++===---:::Axios Failed:::---===+++')
        //数据结束加载动画效果
        this.endLoading();
        let errExp:IException = {
            code: IExceptionData.code,
            message:IExceptionData.message + '#fail'
        }
        return Promise.reject(errExp)
    }

    /**
     * 失败回调函数
     * @param {*} res 数据
     * @param {*} reject
     */
    catch(res : any) {
        console.log(res,'+++===---:::Axios Catch Exception:::---===+++')
        //数据结束加载动画效果
        this.endLoading();
        let errExp:IException = {
            code: IExceptionData.code,
            message:IExceptionData.message + '#catch'
        }
        return Promise.reject(errExp)
    }

    /**
     * 异常错误回调函数
     * @param {*} error 异常错误数据
     * @param {*} type 是request还是response类型
     */
    error(error : any,type:string) {
        console.log(error,'+++===---:::Axios ' + type + ' Error:::---===+++')
        //数据结束加载动画效果
        this.endLoading();
        let errExp:IException = {
            code: IExceptionData.code,
            message:IExceptionData.message + '#' + type
        }
        return Promise.reject(errExp)
    }
}

const http = new Request();

export default http;
