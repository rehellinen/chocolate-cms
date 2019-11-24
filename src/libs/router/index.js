import Vue from 'vue'
import Router from 'vue-router'
import { getAllConfig } from './utils'

Vue.use(Router)

const routes = [
  ...getAllConfig(),
  { path: '*', redirect: '/404' }
]

export const router = new Router({
  routes
})
