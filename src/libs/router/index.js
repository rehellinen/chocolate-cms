import Vue from 'vue'
import Router from 'vue-router'
import { getAllConfig, processConfig } from './utils'

Vue.use(Router)

const routes = [
  ...processConfig(getAllConfig()),
  { path: '*', redirect: '/404' }
]

export const router = new Router({
  routes
})
