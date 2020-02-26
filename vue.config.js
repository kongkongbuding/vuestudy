const path = require('path')
// //
module.exports = {
  // 基本路径
  baseUrl: process.env.NODE_ENV === 'production' ? '' : '/',
  runtimeCompiler: true,
  // webpack配置
  chainWebpack: config => {
    // 设置静态目录别名
    config
      .resolve
      .alias
      .set('public', path.join(__dirname, 'public'))
      .set('-', path.join(__dirname, 'assets'))
    config
      .entry('index')
        .add('babel-polyfill')
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    port: 8080,
    //proxy: 'http://47.95.14.230:9208', // 设置代理
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
