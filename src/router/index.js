import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import Login from '../pages/Login'
import IndexMain from "../views/IndexMain";
import AdminCenter from "../views/AdminCenter";
import RetrievalCenter from "../views/RetrievalCenter";
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/',
        name: 'indexMain',
        component: IndexMain
      },
      {
        path: '/adminCenter',
        name: 'adminCenter',
        component: AdminCenter
      },
      {
        path: '/retrievalCenter',
        name: 'RetrievalCenter',
        component: RetrievalCenter
      },
      {
        path: '/addProject',
        name: 'AddProject',
        // route level code-splitting
        // this generates a separate chunk (AddProject.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "AddProject" */ '../views/AddProject.vue'), //路由懒加载
      },
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta:{
      requireAuth: true //不需要登陆就可以进入页面
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
/*******
 * 全局路由守卫
 * 处理是否需要登陆或者是需要特殊处理的页面
 * requireAuth是否需要登录才能进入的页面,requireAuth为true不需要登陆。没设置或者为false需要登陆
 ****/
router.beforeEach((to, from, next) => {
  if(!to.meta.requireAuth){
    const isInto = sessionStorage.getItem('userLoginInfo') || null;
    if(isInto){
      next();
    }else {
      next({
        path:'/Login',
        query: {redirect: to.fullPath}
      });
    }
  }else {
    next();
  }
});

export default router
