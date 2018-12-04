import Vue from 'vue'
// 清除浏览器默认的样式
import 'normalize.css'

import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.118.226:50053' : ''
Vue.prototype.$ajax = axios

Vue.config.productionTip = false
// window.vue = Vue

Vue.filter('first', function (v) {
  return v + 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
