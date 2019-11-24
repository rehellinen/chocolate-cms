// cms框架内置路由

export default [
  {
    // 是否在左侧菜单栏显示
    show: true,
    // 左侧菜单栏标题
    title: '首页',
    // 左侧菜单栏icon，支持class
    icon: 'el-icon-odometer',
    // vue-router的name配置项，同时会作为webpackChunkName魔法注释的值
    name: 'index',
    // vue-router的path配置项
    path: '/',
    // vue-router的component配置项，路径相对于src/pages定位
    component: 'index',
    // vue-router的其他配置项都写在里面
    others: {},
    // 数值越大，越在前面显示
    order: 0,
    // 子菜单
    children: []
  },
  {
    show: true,
    title: '错误页',
    icon: 'el-icon-circle-close',
    name: '404',
    path: '/404',
    component: 'not-found/not-found',
    order: 0
  }
]
