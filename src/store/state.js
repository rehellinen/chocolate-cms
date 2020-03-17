/**
 *  state.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import { getAllConfig } from 'libs/utils'

const state = {
  // 最原始的菜单配置
  menus: getAllConfig(),
  // 左侧菜单展开 / 收缩状态
  isMenuCollapse: false,
  // 是否为手机
  isPhone: false,
  // 当前登录的用户信息
  user: {},
  // 当前用户拥有的权限
  auth: []
}

export { state }
