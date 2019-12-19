import Vue from 'vue'
import Router from 'vue-router'
import { getAllConfig, processConfig, beforeEach } from './utils'

Vue.use(Router)

const routes = [
  ...processConfig(getAllConfig()),
  { path: '/login', component: () => import('libs/components/login/login') },
  { path: '*', redirect: '/404' }
]

export const router = new Router({
  routes,
  beforeEach
})
