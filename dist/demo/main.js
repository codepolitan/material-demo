var domready = require('material/src/module/domready');
var Demo = require('./app.js');

domready(function() {
  console.log('start demo');
  new Demo();
});
