/**
 *  getters.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
const getters = {
  getMenuByPath: (state) => (path) => {
    return state.menus.find(item => item.path === path)
  }
}

export { getters }
