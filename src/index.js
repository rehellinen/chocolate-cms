/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/28 10:24
 */
import Vue from 'vue'
import App from './App'
import { router } from './router/router'
import {
  Header, Container, Aside, Main, Footer,
  Row, Col,
  Menu, Submenu, MenuItemGroup, MenuItem,
  Form, FormItem, Input, Button, Dialog, Select, Option,
  Table, TableColumn,
  Breadcrumb, BreadcrumbItem,
  Upload, Card,
  Pagination, DatePicker, Radio
} from 'element-ui'
import 'assets/theme/index.css'

[
  Header, Container, Aside, Main, Footer,
  Row, Col,
  Menu, Submenu, MenuItemGroup, MenuItem,
  Form, FormItem, Input, Button, Dialog, Select, Option,
  Table, TableColumn,
  Breadcrumb, BreadcrumbItem,
  Upload, Card,
  Pagination, DatePicker, Radio
].forEach(item => Vue.use(item))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
