export const custom = [
  {
    show: true,
    title: '文章管理',
    icon: 'el-icon-s-operation',
    name: 'article',
    path: '/article',
    component: 'pages/article',
    order: 0,
    children: [
      {
        show: true,
        title: '所有文章',
        icon: 'el-icon-tickets',
        name: 'article',
        path: '/article',
        component: 'pages/article',
        order: 0
      },
      {
        show: true,
        title: '添加文章',
        icon: 'el-icon-circle-plus-outline',
        name: 'article-add',
        path: '/article/add',
        component: 'pages/article/add',
        order: 0
      }
    ]
  },
  {
    show: true,
    title: '上传组件',
    icon: 'el-icon-upload',
    name: 'upload',
    path: '/upload-file',
    component: 'pages/upload-file',
    order: 0
  },
  {
    show: true,
    title: '表单组件',
    icon: 'el-icon-document',
    name: 'form',
    path: '/form',
    component: 'pages/form',
    order: 0
  },
  {
    show: true,
    title: '权限管理',
    icon: 'el-icon-s-operation',
    name: 'auth',
    path: '/auth',
    component: 'pages/authority',
    order: 1,
    children: [
      {
        show: true,
        title: '用户列表',
        icon: 'el-icon-tickets',
        name: 'auth',
        path: '/auth',
        component: 'pages/authority',
        order: 0
      },
      {
        show: false,
        title: '编辑用户',
        icon: 'el-icon-tickets',
        name: 'auth-edit',
        path: '/auth/edit',
        component: 'pages/form/index',
        order: 0
      },
      {
        show: true,
        title: '添加用户',
        icon: 'el-icon-circle-plus-outline',
        name: 'auth-add',
        path: '/auth/add',
        component: 'pages/authority/add',
        order: 0
      },
      {
        show: true,
        title: '分组管理',
        icon: 'el-icon-tickets',
        name: 'role-manage',
        path: '/auth/role/manage',
        component: 'pages/authority/role/manage',
        order: 0
      },
      {
        show: true,
        title: '添加分组',
        icon: 'el-icon-circle-plus-outline',
        name: 'role-add',
        path: '/auth/role/add',
        component: 'pages/authority/role/add',
        order: 0
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
    order: 2
  }
]
