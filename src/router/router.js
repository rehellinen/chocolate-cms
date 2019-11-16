/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2019/3/3 15:53
 */
import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('../cms-page/index')
const Article = () => import('../cms-page/article')
const Menu = () => import('../cms-page/menu')
const Login = () => import('../components/login/login')

Vue.use(Router)

const routes = [
  { path: '/', component: Index },
  { path: '/article', component: Article },
  { path: '/menu', component: Menu },
  { path: '/login', component: Login }
]

export const router = new Router({
  routes
})
