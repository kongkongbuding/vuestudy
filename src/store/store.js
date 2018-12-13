import Vue from 'vue'
import Vuex from 'vuex'
import A from './s1'
import B from './s2'
import Notice from './notice'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    a: A,
    b: B,
    notice: Notice
  },
  state: {},
  mutations: {
    test () {
      console.log(111)
    },
    pdfIframeClose (state) {
      state.notice.pdfSrc = false
      state.notice.pdf = false
      console.log(1111)
    },
    pdfIframeOpen (state) {
      if (state.notice.pdfCloseTip) {
        setTimeout(() => {
          window.alert('点击头部标题关闭文件')
          state.notice.pdfCloseTip = false
        }, 1500)
      }
    }
  },
  actions: {
  },
  getters: {
    indexTodo: 商店 => {
      return 商店.index % 10
    }
  }
})
