import Vue from 'vue'
// 清除浏览器默认的样式
import 'normalize.css'

import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

import Tooltip from 'cll-vue-components/plugins/tooltip'
import Loading from 'cll-vue-components/plugins/loading'
import Badge from 'cll-vue-components/plugins/badge'
import Message from 'cll-vue-components/plugins/message'

Vue.use(Tooltip)
Vue.use(Loading, { skin: 'pc' })
Vue.use(Badge)
Vue.use(Message)

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://192.168.118.226:50053' : ''
Vue.prototype.$ajax = axios

Vue.config.productionTip = false

Vue.filter('add', function (v) {
  return v + 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
