import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta:{
      requireAuth: true //不需要登陆就可以进入页面
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'), //路由懒加载
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
