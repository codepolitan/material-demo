/**
 * material demo
 * @type {[type]}
 */

var compression = require('compression')
var express = require('express')
var app = express()

var port = 3001

app.use(compression())
// app.use('/', express.static(__dirname + '/dist'));
app.use('/dist', express.static(__dirname + '/dist'))
app.use('/public', express.static(__dirname + '/public'))
app.use('/src', express.static(__dirname + '/src'))
app.use('/vendor', express.static(__dirname + '/dist/vendor'))

app.use('/material', express.static(__dirname + '/node_modules/material/dist'))
app.use('/report', express.static(__dirname + '/node_modules/material/report'))
app.use('/docs', express.static(__dirname + '/node_modules/material/docs'))
app.use('/doc', express.static(__dirname + '/node_modules/material/doc'))

app.listen(process.env.PORT || port)

console.info('app running on port', port)
