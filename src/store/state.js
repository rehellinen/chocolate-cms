/**
 *  state.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import { getAllConfig } from 'libs/router/utils'

const state = {
  // 最原始的菜单配置
  menus: getAllConfig(),
  // 左侧菜单展开 / 收缩状态
  isMenuCollapse: false
}

export { state }
