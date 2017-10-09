/**
 * material demo
 * @type {[type]}
 */

var __dirname

const path = require('path')
const compression = require('compression')
const express = require('express')
const app = express()

const port = 3001

app.use(compression())
// app.use('/', express.static(__dirname + '/dist'));
app.use('/dist', express.static(path.join(__dirname, '/dist')))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/vendor', express.static(path.join(__dirname, '/dist/vendor')))

app.use('/material', express.static(path.join(__dirname, '/node_modules/material/dist')))
app.use('/report', express.static(path.join(__dirname, '/node_modules/material/report')))
app.use('/docs', express.static(path.join(__dirname, '/node_modules/material/docs')))
app.use('/doc', express.static(path.join(__dirname, '/node_modules/material/doc')))

app.listen(process.env.PORT || port)

console.info('app running on port', port)
