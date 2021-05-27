/*******
 * api接口统一管理
 *公用接口但传参不一样请在后面备注清楚
 * otherSet.headerSet => 请求头设置
 * multipart/form-data
 * application/x-www-form-urlencoded;charset=UTF-8
 * application/json
 * otherSet.token => token设置为true是需要携带
 ****/
import {get,post} from './http';
export const apiLogin = params => get('/login', params);//登陆
export const apiGetNoticelist = params => post('/getNoticelist', params,{token:true});//列表
