/*
环境判断
*/
export function processEnv(){
  let baseUrl = '';
  // 环境的切换
  if (process.env.NODE_ENV == 'development') {
    //开发
    baseUrl = 'http://localhost:8080/proxy'; //设置本地代理。跨域请求
  } else if (process.env.NODE_ENV == 'debug') {
    //测试
  } else if (process.env.NODE_ENV == 'production') {
    //线上环境(dict)
    baseUrl = 'https://api.apiopen.top';
  }
  return baseUrl;
}
