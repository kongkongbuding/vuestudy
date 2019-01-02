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

Vue.config.productionTip = false

Vue.filter('add', function (v) {
  return v + 1
})

axios.request({
  url: './api/urlHelp.json'
})
  .then(ret => {
    var urlHelp = ret.data
    axios.defaults.urlHelp = urlHelp
    Vue.prototype.$ajax = axios
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
