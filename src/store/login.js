/**
 * cll1's store
 */
export default {
  state: {
    age: '',
    email: '',
    name: '',
    password: '',
    phone: '',
    portrait_name: '',
    portrait_path: '',
    portrait_type: '',
    sexText: '',
    user: ''
  },
  mutations: {
    setUser: function (s, d) {
      s = Object.assign(s, d)
    }
  },
  actions: {},
  getters: {}
}
