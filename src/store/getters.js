/**
 *  getters.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
import { deepTraversalAll } from 'libs/router/utils'

const getters = {
  plainMenus: (state) => {
    const menus = []
    deepTraversalAll(state.menus, (config) => {
      menus.push(config)
    })
    return menus
  },
  getMenuByPath: (state) => (path) => {
    return state.menus.find(item => item.path === path)
  }
}

export { getters }
