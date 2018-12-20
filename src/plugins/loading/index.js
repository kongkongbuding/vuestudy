/**
 * this.$loading.show().hide()
 */
import PhoneLoading from './phone.vue'
import DefaultLoding from './default.vue'
import TowPoints from './towPoints.vue'

export default {
  install (Vue, options = {}) {
    if (Vue.$loading) {
      console.warn('已存在Vue.$loading!')
      return
    }
    let $load
    if (!$load) {
      let UsePlugin
      let { skin } = options
      switch (skin) {
        case 'phone':
          UsePlugin = PhoneLoading
          break
        case 'towPoints':
          UsePlugin = TowPoints
          break
        default:
          UsePlugin = DefaultLoding
          break
      }
      const LoadingPlugin = Vue.extend(UsePlugin)
      $load = new LoadingPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($load.$el)
    }

    let loading = {
      show (text) {
        $load.show = true
        $load.text = text
      },
      hide () {
        $load.show = false
      }
    }

    Vue.$loading = loading

    Vue.mixin({
      created () {
        this.$loading = Vue.$loading
      }
    })
  }
}
