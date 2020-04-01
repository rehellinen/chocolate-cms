import { types } from './mutation-types'
import { removeToken } from 'libs/utils'

const actions = {
  changeMenuCollapseStatus ({ commit, state }) {
    commit(types.CHANGE_MENU_COLLAPSE_STATUS, !state.isMenuCollapse)
  },

  setPhoneStatus ({ commit, state }, status) {
    commit(types.CHANGE_PHONE_STATUS, status)
  },

  setUser ({ commit }, user) {
    commit(types.SET_USER, user)
  },

  setAuth ({ commit }, auth) {
    commit(types.SET_AUTH, auth)
  },

  logout ({ commit }) {
    window.location.href = window.location.origin + '/#/login'
    removeToken()
    commit(types.SET_USER, {})
    commit(types.SET_AUTH, [])
  }
}

export { actions }
