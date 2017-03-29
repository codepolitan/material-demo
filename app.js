/**
 * material demo
 * @type {[type]}
 */

var express = require('express');
var app = express();

var port = 3001;

app.use(express.compress());
//app.use('/', express.static(__dirname + '/dist'));
app.use('/element', express.static(__dirname + '/dist/element'));
app.use('/demo', express.static(__dirname + '/dist/demo'));
app.use('/flickr', express.static(__dirname + '/dist/flickr'));
app.use('/mdl', express.static(__dirname + '/dist/mdl'));
app.use('/vendor', express.static(__dirname + '/dist/vendor'));
app.use('/report', express.static(__dirname + '/node_modules/material/report'));
app.use('/vendor', express.static(__dirname + '/dist/report'));
app.use('/skin', express.static(__dirname + '/dist/skin'));
app.use('/build', express.static(__dirname + '/build'));
app.use('/docs', express.static(__dirname + '/node_modules/material/docs'));
app.use('/doc', express.static(__dirname + '/node_modules/material/doc'));

console.info('dist', __dirname + '/dist');

app.listen(process.env.PORT || port);

console.info('app running on port', port);
