/*******
 * api接口统一管理
 *公用接口但传参不一样请在后面备注清楚
 ****/
import {get,post} from './http';
export const apiLogin = params => get('/login', params);//登陆
export const apiGetNoticelist = params => post('/getNoticelist', params);//列表
