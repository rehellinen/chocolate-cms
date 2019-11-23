/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/28 10:24
 */
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import store from './store'
import { router } from './router/router'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
