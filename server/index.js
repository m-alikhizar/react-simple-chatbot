const express = require('express')
const helmet = require('helmet')

const app = express();

app.use(helmet())

app.get('/', function(req, res) {
  res.send('hello world')
})

app.listen(3001, function() {
  console.log('Expample app listening on port 3000!')
})
