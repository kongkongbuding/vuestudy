import Service from './axiosConfig'

export default {
  install (Vue, Url, config = {}) {
    if (config.baseUrl) {
      let api = {}
      // console.log(Url)
      for (let key in Url) {
        api[key] = (conf = {}) => {
          // let params = conf.data
          // let method = conf.method
          // let headers = conf.headers
          // let service = Service(config)
          // return service[method](Url[key], params, { headers })
          return Service(config, conf, Url[key])
        }
      }
      // Url.forEach((key, value) => {
      //   // return service[methods](u.value, params, { headers })
      //   api[key] = (conf = {}, value) => {
      //     let params = conf.data
      //     let method = conf.method || 'post'
      //     let headers = conf.headers
      //     return service[method](value, params, {
      //       headers
      //     })
      //   }
      // })
      // Url.map(u => {
      //   let methods = u.methods || 'post'
      //   let params = u.data || {}
      //   let headers = u.headers
      //   return service[methods](u.url, params, { headers })
      // api[u.name] = (data, headers = {}) => {
      //   let params = data || {}
      //   if (methods === 'get') params = { params }
      //   // let prefix = config.prefix || '/api'
      //   // return service[methods](prefix + u.url, params, {
      //   //   headers
      //   // })
      //   return service[methods](u.url, params, { headers })
      // }
      // })
      Vue.prototype.$ajax = api
      Vue.$ajax = api
    } else console.error('baseUrl为必须传参数')
  }
}
