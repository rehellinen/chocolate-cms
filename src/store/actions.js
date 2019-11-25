/**
 *  actions.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
import { types } from './mutation-types'

const actions = {
  changeMenuCollapseStatus ({ commit, state }) {
    commit(types.CHANGE_MENU_COLLAPSE_STATUS, !state.isMenuCollapse)
  },
  setPhoneStatus ({ commit, state }, status) {
    commit(types.CHANGE_PHONE_STATUS, status)
  }
}

export { actions }
