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
    children: [],
    // 设置权限，super_admin表示超级管理员特有权限
    auth: ['super_admin']
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
  },
  {
    show: true,
    title: '权限管理',
    icon: 'el-icon-s-operation',
    name: 'auth',
    path: '/auth',
    component: 'libs/pages/authority',
    order: 1,
    children: [
      {
        show: true,
        title: '用户列表',
        icon: 'el-icon-tickets',
        name: 'auth',
        path: '/auth',
        component: 'libs/pages/authority',
        order: 0,
        auth: ['super_admin']
      },
      {
        show: false,
        title: '编辑用户',
        icon: 'el-icon-tickets',
        name: 'user-edit',
        path: '/auth/edit',
        component: 'libs/pages/form/index',
        order: 0,
        auth: ['super_admin']
      },
      {
        show: true,
        title: '添加用户',
        icon: 'el-icon-circle-plus-outline',
        name: 'user-add',
        path: '/auth/add',
        component: 'libs/pages/authority/add',
        order: 0,
        auth: ['super_admin']
      },
      {
        show: true,
        title: '分组管理',
        icon: 'el-icon-tickets',
        name: 'role-manage',
        path: '/auth/role/manage',
        component: 'libs/pages/authority/role/manage',
        order: 0,
        auth: ['super_admin']
      },
      {
        show: true,
        title: '添加分组',
        icon: 'el-icon-circle-plus-outline',
        name: 'role-add',
        path: '/auth/role/add',
        component: 'libs/pages/authority/role/add',
        order: 0,
        auth: ['super_admin']
      },
      {
        show: true,
        title: '权限管理',
        icon: 'el-icon-tickets',
        name: 'auth-manage',
        path: '/auth/auth/manage',
        component: 'libs/pages/authority/auth/manage',
        order: 0,
        auth: ['super_admin']
      },
      {
        show: true,
        title: '添加权限',
        icon: 'el-icon-circle-plus-outline',
        name: 'auth-add',
        path: '/auth/auth/add',
        component: 'libs/pages/authority/auth/add',
        order: 0,
        auth: ['super_admin']
      }
    ]
  },
  {
    show: true,
    title: '日志管理',
    icon: 'el-icon-document',
    name: 'log',
    path: '/log',
    component: 'pages/log',
    order: 2,
    auth: ['super_admin']
  }
]
