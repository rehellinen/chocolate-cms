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
    path: '/file-uploader',
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
  }
]
