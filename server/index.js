var express = require('express')
var app = express()

app.use('/static', express.static('../public/dist_server'))
app.get('/', function (req, res) {
  res.send('hello fnd')
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))
