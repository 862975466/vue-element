import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //引入element语言包
console.log('zhLocale==',zhLocale);
const cn = {
  login: {
    'title':'登录',
    'password':'密码',
  },
  registe: {
    'title':'注册',
    'name':'用户名',
  },
  ...zhLocale
}

export default cn;
