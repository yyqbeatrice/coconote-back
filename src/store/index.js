// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    userID: localStorage.getItem('userID') || null,  // 从 localStorage 初始化 userId
  },
  mutations: {
    setuserID(state, userID) {
      state.userID = userID;
      localStorage.setItem('userID', userID);
    },
    clearuserID(state) {
      state.userID = null;
      localStorage.removeItem('userID');
    }
  },
  actions: {
    login({ commit }, userID) {
      commit('setuserID', userID);
    },
    logout({ commit }) {
      commit('clearuserID');
    }
  },
  getters: {
    userID: state => state.userID
  }
})
