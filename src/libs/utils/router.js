import Vue from 'vue'
import Router from 'vue-router'
import { deepTraversalLeaf, getAllConfig } from 'libs/utils'

Vue.use(Router)
// TODO: 移动权限、日志页面到libs下面；路由配置支持redirect
const processConfig = () => {
  const allConfig = getAllConfig()

  const routers = []
  const addRouter = (config) => {
    routers.push({
      name: config.name,
      path: config.path,
      component: () => import(`../../${config.component}`),
      meta: {
        title: config.title,
        icon: config.icon
      }
    })
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
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
