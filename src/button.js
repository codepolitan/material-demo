import {
  button
} from 'material'

document.addEventListener('DOMContentLoaded', function() {
  var btn = button({ text: 'hello', type: 'raised', color: 'primary' }).insert(document.body)
})