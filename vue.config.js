const path = require('path')
const appData = require('./src/mock/data.json')

module.exports = {
  // 基本路径
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/',
  // webpack配置
  chainWebpack: config => {
    // 设置静态目录别名
    config.resolve.alias
      .set('public', path.join(__dirname, 'public'))
      .set('-', path.join(__dirname, 'assets'))
    config.entry('index').add('babel-polyfill')
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true, // 配置自动启动浏览器
    port: 8080,
    // proxy: 'http://47.95.14.230:9208', // 设置代理
    // proxy: 'http://www.erhai.gov.cn:3086',
    proxy: {
      '/pdf': {
        target: 'http://www.erhai.gov.cn:3086/', // 你请求的第三方接口
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          // 路径重写，
          '^/pdf': '/pdf' // 替换target中的请求地址，也就是说以后你在请求http://jisuapi.com/XXXXX这个地址的时候直接写成/api即可。
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    },
    before (app) {
      app.get('/api/data', function (req, res) {
        res.json({
          data: appData
        })
      })
    }
  }
}
