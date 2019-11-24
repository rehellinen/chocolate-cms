import config from 'config/config'

export const deepTraversalAll = (config, cb) => {
  if (Array.isArray(config)) {
    config.forEach(item => deepTraversalAll(item, cb))
  } else if (config.children && config.children.length > 0) {
    cb(config)
    config.children.forEach(item => deepTraversalAll(item, cb))
  } else {
    cb(config)
  }
}

export const deepTraversalLeaf = (config, cb) => {
  // 当config为数组 / config有children属性的时候，不加入路由
  if (Array.isArray(config)) {
    config.forEach(item => deepTraversalLeaf(item, cb))
  } else if (config.children && config.children.length > 0) {
    config.children.forEach(item => deepTraversalLeaf(item, cb))
  } else {
    cb(config)
  }
}

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
  deepTraversalLeaf(config, addRouter)
  return routers
}

export const getAllConfig = () => {
  const allConfig = []
  config.ROUTER_CONF_FILES.forEach(name => {
    const config = require(`config/router/${name}.js`).default
    allConfig.push(...config)
  })
  return allConfig
}
