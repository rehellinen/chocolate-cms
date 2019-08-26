/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2019/3/3 15:53
 */
import Vue from 'vue'
import Router from 'vue-router'
import Article from '../cms-page/article'
import Login from '../components/login/login'

Vue.use(Router)

const routes = [
  { path: '/article', component: Article },
  { path: '/login', component: Login }
]

export const router = new Router({
  routes
})
