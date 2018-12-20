var express = require('express')
var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = 'mongodb://localhost:27017/TEST'

var data = require('../src/mock/data_test.json')
var app = express() // 启动一个web服务器

var selectData = function (client, callback) {
  var db = client.db('TEST')
  var collection = db.collection('user')
  /* eslint-disable */
  collection.insertOne({
    "name": "node1",
    "age": 231
  })
  // callback(result)
  // var whereStr = { "name": 'test' }
  // collection.find(whereStr).toArray(function (err, result) {
  //   if (err) {
  //     console.log('erroe' + err)
  //     return
  //   }
  //   callback(result)
  // })
}
MongoClient.connect(DB_CONN_STR, function (err, client) {
  console.log('连接成功')
  selectData(client, function (result) {
    // , function (err, result) {
    //   if (err) {
    //     res.send("插入数据失败")
    //     return
    //   }
    // }
    console.log(result)
    client.close()
  })
})
app.use('/static', express.static('../public/dist_server'))
app.get('/', function (req, res) {
  res.send('hello fnd')
})
app.get('/api/test', function (req, res) {
  res.send(data)
})
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
