export default [
  {
    show: true,
    title: '文章管理',
    icon: 'el-icon-s-operation',
    name: 'article',
    path: '/article',
    component: 'article',
    order: 0,
    children: [
      {
        show: true,
        title: '所有文章',
        icon: 'el-icon-tickets',
        name: 'article',
        path: '/article',
        component: 'article',
        order: 0
      },
      {
        show: true,
        title: '添加文章',
        icon: 'el-icon-circle-plus-outline',
        name: 'article-add',
        path: '/article/add',
        component: 'article/add',
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
    component: 'upload-file',
    order: 0
  },
  {
    show: true,
    title: '表单组件',
    icon: 'el-icon-document',
    name: 'form',
    path: '/form',
    component: 'form',
    order: 0
  },
  {
    show: true,
    title: '权限管理',
    icon: 'el-icon-s-operation',
    name: 'authority',
    path: '/authority',
    component: 'article',
    order: 0,
    children: [
      {
        show: true,
        title: '用户列表',
        icon: 'el-icon-tickets',
        name: 'authority',
        path: '/authority',
        component: 'authority',
        order: 0
      },
      {
        show: true,
        title: '添加用户',
        icon: 'el-icon-circle-plus-outline',
        name: 'authority-add',
        path: '/authority/add',
        component: 'authority/add',
        order: 0
      },
      {
        show: true,
        title: '分组管理',
        icon: 'el-icon-circle-plus-outline',
        name: 'authority-manage',
        path: '/authority/manage',
        component: 'authority/manage',
        order: 0
      }
    ]
  }
]
