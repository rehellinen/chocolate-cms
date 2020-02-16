import { types } from './mutation-types'

const actions = {
  changeMenuCollapseStatus ({ commit, state }) {
    commit(types.CHANGE_MENU_COLLAPSE_STATUS, !state.isMenuCollapse)
  },

  setPhoneStatus ({ commit, state }, status) {
    commit(types.CHANGE_PHONE_STATUS, status)
  },

  setUser ({ commit }, user) {
    commit(types.SET_LOGIN, true)
    commit(types.SET_USER, user)
  },

  setAuth ({ commit }, auth) {
    commit(types.SET_AUTH, auth)
  }
}

export { actions }
