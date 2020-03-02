// cms框架内置路由

export const framework = [
  {
    // 是否在左侧菜单栏显示
    show: true,
    // 左侧菜单栏标题
    title: '首页',
    // 左侧菜单栏icon，支持class
    icon: 'el-icon-odometer',
    // vue-router的name配置项，同时也参与左侧菜单index生成
    name: 'index',
    // vue-router的path配置项
    path: '/',
    // vue-router的component配置项，为完整路径
    component: 'pages/index',
    // vue-router的其他配置项都写在里面
    others: {},
    // 数值越大，越在前面显示
    order: 9999,
    // 子菜单
    children: []
  },
  {
    show: true,
    title: '错误页',
    icon: 'el-icon-circle-close',
    name: '404',
    path: '/404',
    component: 'pages/not-found/not-found',
    order: 0
  },
  {
    show: false,
    title: '登录',
    name: 'login',
    path: '/login',
    component: 'libs/pages/login/login'
  }
]
