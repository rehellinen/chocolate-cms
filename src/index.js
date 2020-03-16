/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/28 10:24
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import ChocComponents from 'base/index'
import ChocDialog from 'libs/plugins/dialog'

import App from './App'
import store from './store'
import { router } from 'libs/utils/router'
import { Exception } from 'libs/exceptions'

import 'sass/reset.sass'
import 'assets/theme/element-variables.scss'

Vue.use(ElementUI)
Vue.use(ChocComponents)
Vue.use(ChocDialog)

Vue.config.errorHandler = (error, vm) => {
  if (error instanceof Exception) {
    console.log(`自定义异常：${error.message}`)
  } else {
    throw error
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
