/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/8/15 15:42
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import { getters } from './getters'
import { state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'

Vue.use(Vuex)

const vuexStorage = new VuexPersistence({
  key: '__vuex__',
  storage: window.localStorage,
  reducer: stateData => ({
    user: stateData.user,
    auth: stateData.auth
  })
})

export default new Vuex.Store({
  getters,
  state,
  mutations,
  actions,
  plugins: [vuexStorage.plugin],
  strict: true
})
