/**
 * material demo
 * @type {[type]}
 */

const path = require('path')
const compression = require('compression')
const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const app = express()

const port = 3001

var options = {
  key: fs.readFileSync('/Users/jvial/server.key'),
  cert: fs.readFileSync('/Users/jvial/server.crt')
}

// app.use(compression())
app.use('/', express.static(path.join(__dirname, '/')))
app.use('/dist', express.static(path.join(__dirname, '/dist')))
app.use('/public', express.static(path.join(__dirname, '/public')))

app.use('/material', express.static(path.join(__dirname, '/node_modules/material/dist')))
app.use('/report', express.static(path.join(__dirname, '/node_modules/material/report')))
app.use('/docs', express.static(path.join(__dirname, '/node_modules/material/docs')))

https.createServer(options, app).listen(port)

// app.listen(process.env.PORT || port)

console.info('app running on port', port)
