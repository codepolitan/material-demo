import domready from './module/domready'
import App from './app.js'

domready(function () {
  var app = new App()

  console.log('start app', app)
})

// import debug from 'debug.js';
// // by default stderr is used
// const log = debug('app:log');
// if (ENV) {
//   // Enable the logger.
//   debug.enable('*');
//   log('Logging is enabled!');

//   document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>');
// } else {
//   debug.disable();
// }
// document.addEventListener('DOMContentLoaded', function () {
//   new App()
// })
