/**
 *  mutations.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:44
 */
import { types } from './mutation-types'

export const mutations = {
  // 保存至 store 中的购物车数据
  [types.SAVE_MENUS] (state, data) {
    state.menus = data
  }
}
