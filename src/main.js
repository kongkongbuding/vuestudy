import Vue from 'vue'
// 清除浏览器默认的样式
import 'normalize.css'

import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios-dev2'

import Tooltip from 'cll-vue-components/plugins/tooltip'
import Loading from 'cll-vue-components/plugins/loading'
import Badge from 'cll-vue-components/plugins/badge'
import Message from 'cll-vue-components/plugins/message'
import Ztree from 'cll-vue-components/plugins/ztree'
import DatePicker from 'cll-vue-components/plugins/datePicker'
import Download from 'cll-vue-components/plugins/download'

import 'vx-easyui/dist/themes/default/easyui.css'
import 'vx-easyui/dist/themes/icon.css'
import 'vx-easyui/dist/themes/vue.css'
import EasyUI from 'vx-easyui'

Vue.use(EasyUI)

Vue.use(Tooltip)
Vue.use(Loading, { skin: 'pc' })
Vue.use(Badge)
Vue.use(Message)
Vue.use(Ztree)
Vue.use(DatePicker)
Vue.use(Download)
// Vue.component(Button.name, Button)
// Vue.component(DatePicker.name, DatePicker)

Vue.config.productionTip = false

Vue.filter('add', function (v) {
  return v + 1
})

axios.request({
  url: './api/urlHelp.json'
})
  .then(ret => {
    let ajax = axios.create({
      urlHelp: ret.data
    })
    Vue.prototype.$ajax = ajax
    window.$ajax = ajax
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
