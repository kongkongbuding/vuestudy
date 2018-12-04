import Vue from 'vue'
import Vuex from 'vuex'
import A from './s1'
import B from './s2'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    a: A,
    b: B
  },
  state: {
    index: 1
  },
  mutations: {
    自增: (s, i = 1) => {
      s.index += i
    }
  },
  actions: {
    todo ({ commit }, i = 0) {
      commit('自增', i + 1)
    }
  },
  getters: {
    indexTodo: 商店 => {
      return 商店.index % 10
    }
  }
})
