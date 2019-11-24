import config from 'config/config'

export const processConfig = (config) => {
  const routers = []
  const addRouter = (config) => {
    routers.push({
      name: config.name,
      path: config.path,
      component: () => import(`pages/${config.component}`),
      meta: {
        title: config.title,
        icon: config.icon
      }
    })
  }
  const deepTraversal = (config) => {
    // 当config为数组 / config有children属性的时候，不加入路由
    if (Array.isArray(config)) {
      config.forEach(item => deepTraversal(item))
    } else if (config.children && config.children.length > 0) {
      config.children.forEach(item => deepTraversal(item))
    } else {
      addRouter(config)
    }
  }
  deepTraversal(config)
  return routers
}

export const getAllConfig = () => {
  const allConfig = []
  config.ROUTER_CONF_FILES.forEach(name => {
    const config = require(`config/router/${name}.js`).default
    allConfig.push(...processConfig(config))
  })
  return allConfig
}
