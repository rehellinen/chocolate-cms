/**
 *  getters.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:43
 */
const getters = {
  getMenuByPath: (state) => (path) => {
    console.log(state)
    return state.menus.find(item => item.url === path)
  }
}

export { getters }
