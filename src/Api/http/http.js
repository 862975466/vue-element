/*******
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 ****/
import axios from 'axios';
import {processEnv} from "../../utils/funs";
import { Message,Loading} from 'element-ui';
import QS from 'qs';
import router from "../../router";
axios.defaults.baseURL = processEnv(); //请求前缀
// 请求超时时间
axios.defaults.timeout = 5000;
/*******
 * 请求拦截器
 ****/
var loadinginstace;//Loading方法
var loadingLeng = 500;
axios.interceptors.request.use(config => {
  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  loadinginstace = Loading.service({ fullscreen: true });//会导致页面闪烁
  loadinginstace.text="加载中";
  return config;
}, error => {
  loadinginstace.close();
  setTimeout(()=>{
    loadingLeng--;
  },loadingLeng);
  return Promise.error(error);
});
/*******
 * 响应拦截器
 * 响应拦截器需要跟后端约定返回格式和状态码
 * 需要确定的是成功状态码和失败状态码等等....，或者是直接是返回在数据格数里的
 ****/
axios.interceptors.response.use(
  response => {
    setTimeout(()=>{
      loadinginstace.close();
    },loadingLeng+1);
    console.log('response==',response);//状态码需要跟后端约定返回格式。
    if (response.status === 200) {
      //后端返回code = 0是成功。否则失败
      if(response.data.code === 0){
        return Promise.resolve(response);
      }else {
        Message.error(response.data.message);
      }
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    loadinginstace.close();
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          });
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.error('登录过期，请重新登录');
          // 清除token
          localStorage.removeItem('token');
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;
        // 404请求不存在
        case 404:
          Message.error('网络请求不存在');
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message.error(' error.response.data.Message');
      }
      return Promise.reject(error.response);
    }
  }
);
/*******
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 ****/
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/*******
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 ****/
export function post(url, params,otherSet = {}) {
  httpSet(otherSet);
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
function httpSet(setParam){
  // post请求头的设置
  if(setParam.headerSet){
    axios.defaults.headers.post['Content-Type'] = setParam.headerSet;
  }else {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  }
  //携带token
  if(setParam.token){
    const accessToken = sessionStorage.getItem('access_token');
    const tokenType = sessionStorage.getItem('token_type');
    axios.defaults.headers.Authorization = tokenType + ' ' + accessToken;
  }
}
