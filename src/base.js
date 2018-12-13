export.install = function (Vue, options) {
  Vue.prototype.data = function (key, value) {
    let meta = {}
    let old = meta[key]
    if (value === void 0) {
      return old
    }
    meta[key] = value
    Vue.do('dc_' + key, )
  }
}