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
        name: 'retrievalCenter',
        component: RetrievalCenter
      },
      {
        path: '/addProject',
        name: 'addProject',
        component: () => import('../views/AddProject.vue'), //路由懒加载
      },
      {
        path: '/userAdmin',
        name: 'userAdmin',
        component: () => import('../views/UserAdmin.vue'), //路由懒加载
      },
      //
      {
        path: '/userAdmin',
        name: 'userAdmin',
        component: () => import('../views/UserAdmin.vue'), //路由懒加载
      },
      {
        path: '/userAdmin',
        name: 'userAdmin',
        component: () => import('../views/UserAdmin.vue'), //路由懒加载
      },
      {
        path: '/uesrInto',
        name: 'uesrInto',
        component: () => import('../views/UesrInto.vue'), //路由懒加载
      },
      {
        path: '/scanningAdmin',
        name: 'scanningAdmin',
        component: () => import('../views/ScanningAdmin.vue'), //路由懒加载
      },
      {
        path: '/addTask',
        name: 'addTask',
        component: () => import('../views/AddTask.vue'), //路由懒加载
      },
      {
        path: '/infoGathering',
        name: 'infoGathering',
        component: () => import('../views/InfoGathering.vue'), //路由懒加载
      },      {
        path: '/addGathering',
        name: 'addGathering',
        component: () => import('../views/AddGathering.vue'), //路由懒加载
      },      {
        path: '/siteCrawler',
        name: 'siteCrawler',
        component: () => import('../views/SiteCrawler.vue'), //路由懒加载
      },
      {
        path: '/addCrawler',
        name: 'addCrawler',
        component: () => import('../views/AddCrawler.vue'), //路由懒加载
      },
      {
        path: '/urlRetrieval',
        name: 'urlRetrieval',
        component: () => import('../views/UrlRetrieval.vue'), //路由懒加载
      },
      {
        path: '/nodeAdmin',
        name: 'nodeAdmin',
        component: () => import('../views/NodeAdmin.vue'), //路由懒加载
      },
      {
        path: '/addNode',
        name: 'addNode',
        component: () => import('../views/AddNode.vue'), //路由懒加载
      },
      {
        path: '/systemAdmin',
        name: 'systemAdmin',
        component: () => import('../views/SystemAdmin.vue'), //路由懒加载
      },
      {
        path: '/addUser',
        name: 'addUser',
        component: () => import('../views/AddUser.vue'), //路由懒加载
      },
      {
        path: '/agentHref',
        name: 'agentHref',
        component: () => import('../views/AgentHref.vue'), //路由懒加载
      }


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
