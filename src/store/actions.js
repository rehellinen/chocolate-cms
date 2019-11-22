/**
 *  actions.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
import { types } from './mutation-types'
import { Menu } from '../model'

const actions = {
  // 获取菜单
  async getMenus ({ commit, state }) {
    const menus = await new Menu().getLeftMenu()
    commit(types.SAVE_MENUS, menus)
  }
}

export { actions }
