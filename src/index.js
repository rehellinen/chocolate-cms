/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/28 10:24
 */
import Vue from 'vue'
import App from './App'
import { router } from './router/router'
import store from './store'
import {
  Header, Container, Aside, Main, Footer,
  Row, Col,
  Menu, Submenu, MenuItemGroup, MenuItem,
  Form, FormItem, Input, Button, Dialog, Select, Option,
  Table, TableColumn,
  Breadcrumb, BreadcrumbItem,
  Upload, Card,
  Pagination, DatePicker, Radio,
  Progress
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

[
  Header, Container, Aside, Main, Footer,
  Row, Col,
  Menu, Submenu, MenuItemGroup, MenuItem,
  Form, FormItem, Input, Button, Dialog, Select, Option,
  Table, TableColumn,
  Breadcrumb, BreadcrumbItem,
  Upload, Card,
  Pagination, DatePicker, Radio,
  Progress
].forEach(item => Vue.use(item))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
