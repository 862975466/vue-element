import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";
import Login from '../pages/Login'
import IndexMain from "../views/indexMain";
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    component: Home,
    children:[
      {
        path: '/',
        name: 'indexMain',
        component: IndexMain
      },
      {
        path: '/entrustOrder',
        name: 'entrustOrder',
        component: () => import('../views/entrustOrder.vue'), //路由懒加载
      },
      {
        path: '/carsSet',
        name: 'carsSet',
        component: () => import('../views/carsSet.vue'), //路由懒加载
      },
      {
        path: '/dispatchOrder',
        name: 'dispatchOrder',
        component: () => import('../views/dispatchOrder.vue'), //路由懒加载
      },
      {
        path: '/transportRecord',
        name: 'transportRecord',
        component: () => import('../views/transportRecord.vue'), //路由懒加载
      },  {
        path: '/maintenance',
        name: 'maintenance',
        component: () => import('../views/maintenance.vue'), //路由懒加载
      },
      {
        path: '/abnormalRecord',
        name: 'abnormalRecord',
        component: () => import('../views/abnormalRecord.vue'), //路由懒加载
      },
      {
        path: '/delayRecord',
        name: 'delayRecord',
        component: () => import('../views/delayRecord.vue'), //路由懒加载
      },
      {
        path: '/realCost',
        name: 'realCost',
        component: () => import('../views/realCost.vue'), //路由懒加载
      },
      {
        path: '/realBill',
        name: 'realBill',
        component: () => import('../views/realBill.vue'), //路由懒加载
      },
      {
        path: '/invoiceSet',
        name: 'invoiceSet',
        component: () => import('../views/invoiceSet.vue'), //路由懒加载
      },
      {
        path: '/orderStats',
        name: 'orderStats',
        component: () => import('../views/orderStats.vue'), //路由懒加载
      },
      {
        path: '/transportAnls',
        name: 'transportAnls',
        component: () => import('../views/transportAnls.vue'), //路由懒加载
      },
      {
        path: '/realCostECharts',
        name: 'realCostECharts',
        component: () => import('../views/realCostECharts.vue'), //路由懒加载
      },
      {
        path: '/carrierSet',
        name: 'carrierSet',
        component: () => import('../views/carrierSet.vue'), //路由懒加载
      },
      {
        path: '/clientSet',
        name: 'clientSet',
        component: () => import('../views/clientSet.vue'), //路由懒加载
      },
      {
        path: '/consignorSet',
        name: 'consignorSet',
        component: () => import('../views/consignorSet.vue'), //路由懒加载
      },
      {
        path: '/carSet',
        name: 'carSet',
        component: () => import('../views/carSet.vue'), //路由懒加载
      },
      {
        path: '/driverSet',
        name: 'driverSet',
        component: () => import('../views/driverSet.vue'), //路由懒加载
      },
      {
        path: '/userSet',
        name: 'userSet',
        component: () => import('../views/userSet.vue'), //路由懒加载
      },
      {
        path: '/roleSet',
        name: 'roleSet',
        component: () => import('../views/roleSet.vue'), //路由懒加载
      },
      {
        path: '/dataDictionary',
        name: 'dataDictionary',
        component: () => import('../views/dataDictionary.vue'), //路由懒加载
      },
      {
        path: '/operationLog',
        name: 'operationLog',
        component: () => import('../views/operationLog.vue'), //路由懒加载
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
