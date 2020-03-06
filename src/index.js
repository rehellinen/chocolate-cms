/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/28 10:24
 */
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import store from './store'
import { router } from 'libs/utils/router'
import { Exception } from 'libs/exceptions'

import 'sass/reset.sass'
import 'assets/theme/element-variables.scss'

Vue.config.errorHandler = function (err, vm, info) {
  if (err instanceof Exception) {
    console.error(err.message)
  } else {
    throw err
  }
}

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
