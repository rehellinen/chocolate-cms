/**
 *  mutations.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import { types } from './mutation-types'

export const mutations = {
  [types.SAVE_MENUS] (state, data) {
    state.menus = data
  },

  [types.CHANGE_MENU_COLLAPSE_STATUS] (state, status) {
    state.isMenuCollapse = status
  },

  [types.CHANGE_PHONE_STATUS] (state, status) {
    state.isPhone = status
  }
}
