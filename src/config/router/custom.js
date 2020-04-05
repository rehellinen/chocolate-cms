export const custom = [
  {
    show: true,
    title: '文章管理',
    icon: 'el-icon-collection',
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
    title: 'Form表单',
    icon: 'el-icon-document',
    name: 'form',
    path: '/form',
    component: 'pages/form',
    order: 0,
    children: [
      {
        show: true,
        title: '输入框',
        icon: 'el-icon-edit',
        name: 'input',
        path: '/form/input',
        component: 'pages/form/input',
        order: 0
      },
      {
        show: true,
        title: '开关',
        icon: 'el-icon-turn-off',
        name: 'switch',
        path: '/form/switch',
        component: 'pages/form/switch',
        order: 0
      },
      {
        show: true,
        title: '滑块',
        icon: 'el-icon-set-up',
        name: 'slide',
        path: '/form/slide',
        component: 'pages/form/slide',
        order: 0
      },
      {
        show: true,
        title: '时间日期选择器',
        icon: 'el-icon-date',
        name: 'date',
        path: '/form/date',
        component: 'pages/form/date',
        order: 0
      },
      {
        show: true,
        title: '多选框',
        icon: 'el-icon-finished',
        name: 'checkbox',
        path: '/form/checkbox',
        component: 'pages/form/checkbox',
        order: 0
      },
      {
        show: true,
        title: '编辑器',
        icon: 'el-icon-edit-outline',
        name: 'editor',
        path: '/form/editor',
        component: 'pages/form/editor',
        order: 0
      },
      {
        show: true,
        title: '上传组件',
        icon: 'el-icon-upload',
        name: 'upload',
        path: '/form/upload',
        component: 'pages/form/upload',
        order: 0
      }
    ]
  }
]
