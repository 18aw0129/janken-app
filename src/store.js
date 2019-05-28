import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    score: []
  },
  mutations: {
    setScore(state, num){
      Vue.set(state.score, state.score.length, num)
    },
    resetScore(state){
      state.score = []
    }
  },
  actions: {

  },
  getters: {
    score(state){
      return state.score
    }
  },
  plugins: [createPersistedState()]
})
