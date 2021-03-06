'use strict'

import emitter from 'material/src/module/emitter'
import dom from 'material/src/module/dom'
import css from 'material/src/module/css'

import defaults from './options'

// import Container from 'material/src/container';
import Layout from 'material/src/layout'
import layout from './layout'
import Cookies from './vendor/cookies'

// demo
import typography from './view/typography'
import appbar from './view/appbar'
import banner from './view/banner'
import button from './view/button'
import calendar from './view/calendar'
import card from './view/card'
import dialog from './view/dialog'
import drawer from './view/drawer'
import checkbox from './view/checkbox'
import switchc from './view/switch'
import field from './view/field'
import slider from './view/slider'
import list from './view/list'
import form from './view/form'
import tree from './view/tree'
import toolbar from './view/toolbar'

import menu from './view/menu'
import snackbar from './view/snackbar'
import select from './view/select'
import progress from './view/progress'
import tabs from './view/tabs'

import ripple from './view/ripple'
import elevation from './view/elevation'

// import calendar from './view/calendar';

var view = {
  typography,
  appbar,
  banner,
  button,
  calendar,
  card,
  checkbox,
  dialog,
  drawer,
  elevation,
  field,
  slider,
  list,
  form,
  tree,
  toolbar,
  ripple,
  menu,
  progress,
  snackbar,
  select,
  switch: switchc,
  tabs
}

/**
 * @class
 */
class App {
  /**
   * @constructor
   * @param  {Object} options - The application options
   * @return {Object} this
   */
  constructor (options) {
    this.options = Object.assign({}, defaults, options || {})

    this.init(options)
    this.build()
    this.setup()

    this.emit('ready')
  }

  /**
   * [init description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  init (options) {
    Object.assign(this, emitter)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/serviceworker.js')
        .then(function (registration) {
          // console.log('Service Worker Registered')
          console.log('./sw.js registration successful with scope: ', registration.scope)
        })
    }

    self.addEventListener('fetch', function (event) {
      console.log('say hello')
      // Do something interesting with the fetch here
    })

    this.body = document.body
  }

  /**
   * [build description]
   * @return {[type]} [description]
   */
  build () {
    this.layout = new Layout(layout, this.body)

    this.main = this.layout.get('main')
  }

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  setup () {
    var navi = this.layout.get('navi')

    this.layout.get('menu-navi').on('click', function (e) {
      navi.toggle(e)
    })

    document.body.addEventListener('scroll', (e) => {
      if (this.body.scrollTop > 0) {
        css.add(this.layout.get('head').root, 'head-shadow')
      } else {
        css.remove(this.layout.get('head').root, 'head-shadow')
      }
    })

    this.layout.get('menu-navi-head').on('click', function (e) {
      navi.close(e)
    })

    var menuList = this.layout.get('navi-list')

    var object = {
      select: (item, e, current) => {
        css.remove(current, 'is-selected')
        css.add(e.target, 'is-selected')
        var name = item.innerText.toLowerCase()
        navi.close(e)
        this.view(name)
      }
    }

    Object.assign(menuList, object)

    menuList.set('list', this.options.components)

    this.layout.get('menu-more').on('click', (e) => {
      this.layout.get('more-menu').show(e)
    })

    // console.log('dark', this.layout.get('darktheme'))

    // this.layout.get('darktheme').on('change', (state) => {
    //   console.log('darktheme', state)
    // })

    // this.layout.get('darktheme').on('change', (state) => {
    //   console.log('darktheme', state)
    //   if (state) {
    //     css.add(this.main, 'dark-theme')
    //   } else {
    //     css.remove(this.main, 'dark-theme')
    //   }
    // })

    this.layout.get('rtl').on('change', (state) => {
      console.log('rtl', state)
      if (state) {
        this.body.dir = 'rtl'
      } else {
        this.body.removeAttribute('dir')
      }
    })

    this.on('view', (name) => {
      var main = this.layout.get('main')
      dom.empty(main.root)

      if (!view[name]) return

      Cookies.set('view', name)
      view[name](main)
    })

    var nameview = Cookies.get('view')

    if (nameview) this.view(nameview)

    return this
  }

  /**
   *
   */
  view (name) {
    console.log('updateMainView', name)

    var header = this.layout.get('head')

    header.set('minimize')
    this.emit('view', name)

    return this
  }
}

export default App
