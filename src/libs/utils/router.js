import Vue from 'vue'
import Router from 'vue-router'
import { deepTraversalLeaf, getAllConfig } from 'libs/utils'
import store from '../../store'

Vue.use(Router)
// TODO: 移动权限、日志页面到libs下面；路由配置支持redirect
const processConfig = () => {
  const allConfig = getAllConfig()

  const routers = []
  const addRouter = (config) => {
    let routerConfig = {
      name: config.name,
      path: config.path,
      component: () => import(`../../${config.component}`),
      meta: {
        title: config.title,
        icon: config.icon,
        auth: config.auth
      }
    }
    if (config.others) {
      routerConfig = Object.assign(routerConfig, config.others)
    }
    routers.push(routerConfig)
  }
  deepTraversalLeaf(allConfig, addRouter)
  return routers
}

const routes = [
  ...processConfig(),
  { path: '*', redirect: '/404' }
]

export const router = new Router({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const { auth, user, isLogin } = store.getters
  if (to.path === '/login') {
    next()
    return
  }
  const isLocked = localStorage.getItem('locked_' + user.id) === '1'
  if (to.path === '/lock') {
    if (isLocked) {
      next()
    } else {
      Vue.prototype.$message({
        message: '无权访问锁定页面',
        type: 'error'
      })
    }
    return
  }
  // 判断页面是否锁定
  if (isLocked) {
    next({ path: '/lock' })
    Vue.prototype.$message({
      message: '页面已锁定，请先解锁',
      type: 'error'
    })
    return
  }

  // 判断用户是否拥有权限
  let hasAuth = false
  // 超级管理员拥有所有权限
  if (user && user.isAdmin) {
    hasAuth = true
  }

  if (!to.meta.auth) {
    hasAuth = true
  } else {
    if (auth.some(auth => to.meta.auth.includes(auth.name))) {
      hasAuth = true
    }
  }
  if (hasAuth) {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  } else {
    if (!isLogin) {
      next({ path: '/login' })
      Vue.prototype.$message({
        message: '请登录',
        type: 'error'
      })
    } else {
      Vue.prototype.$message({
        message: '无权限访问此页面',
        type: 'error'
      })
    }
  }
})
