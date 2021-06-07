import Vue from 'vue'
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import './assets/themeSet/index.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n/i18n';
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
