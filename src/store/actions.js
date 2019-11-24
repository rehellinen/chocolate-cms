/**
 *  actions.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
import { types } from './mutation-types'

const actions = {
  changeMenuCollapseStatus ({ commit }) {
    commit(types.CHANGE_MENU_COLLAPSE_STATUS)
  }
}

export { actions }
