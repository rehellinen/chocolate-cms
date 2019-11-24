export default [
  {
    show: true,
    title: '菜单管理',
    icon: 'el-icon-tickets',
    name: 'menu',
    path: '/menu',
    component: 'menu',
    order: 0,
    children: [
      {
        show: true,
        title: '文章管理1',
        icon: 'el-icon-tickets',
        name: 'article1',
        path: '/article1',
        component: 'article',
        order: 0
      },
      {
        show: true,
        title: '文章管理2',
        icon: 'el-icon-tickets',
        name: 'article2',
        path: '/article2',
        component: 'article',
        order: 0
      }
    ]
  },
  {
    show: true,
    title: '文章管理',
    icon: 'el-icon-tickets',
    name: 'article',
    path: '/article',
    component: 'article',
    order: 0
  }
]
