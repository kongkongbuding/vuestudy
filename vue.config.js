const path = require('path')
const appData = require('./src/mock/data.json')
// 连接路径
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  // 部署生存环境和开发环境下的URL
  // 默认情况下，vue cli 会假设你的应用是被部署在一个域名的根路径上
  // 基本路径
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/',
  // outputdir 在npm run build时，生成文件的目录名称（要和baseURL的生产环境路径一致）
  // outputDir: 'dist'

  // 用于放置生成的静态资源（js, css, img, fonts）
  // assetsDir: 'assets',

  // 制定生成的index.html 的输出路径（打包后，改变系统默认的index.html的文件名）
  // indexPath: 'myIndex.html',

  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  // filenameHashing: false,

  // lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  // lintOnSave: false,

  // 如果你想要在生产构建时禁用 eslint-loader，你可以用如下配置
  // lintOnSave: process.env.NODE_ENV !== 'production',

  // webpack配置
  chainWebpack: config => {
    // 设置静态目录别名
    config.resolve.alias
      .set('public', path.join(__dirname, 'public'))
      .set('-', path.join(__dirname, 'assets'))
      // .set('bus', resolve('src'))
    config.entry('index').add('babel-polyfill')
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true, // 配置自动启动浏览器
    port: 8080,
    // proxy: 'http://47.95.14.230:9208', // 设置代理
    // proxy: 'http://www.erhai.gov.cn:3086',
    proxy: {
      '/api/test': {
        target: 'http://192.168.10.76:3000/api/', // 你请求的第三方接口
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          // 路径重写，
          '^/api': '' // 替换target中的请求地址，也就是说以后你在请求http://jisuapi.com/XXXXX这个地址的时候直接写成/api即可。
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
