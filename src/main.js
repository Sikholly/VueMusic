import Vue from 'vue'
import App from './App.vue'
//element
import ElementUI from 'element-ui';
//element
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css'
//引入router
// import VueRouter from 'vue-router'
//引入路由器
import router from './router/index.js'
// 引入vuex
import store from './vuex/store'

Vue.config.productionTip = false
//注册element
Vue.use(ElementUI);
//注册router
// Vue.use(VueRouter);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
