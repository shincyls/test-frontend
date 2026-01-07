import { createStore } from 'vuex'
import authService from '../services/auth'

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  },

  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    user: (state) => state.user,
    token: (state) => state.token
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    SET_TOKEN(state, token) {
      state.token = token
      state.isAuthenticated = !!token
      if (token) {
        localStorage.setItem('token', token)
      } else {
        localStorage.removeItem('token')
      }
    },
    LOGOUT(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },

  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await authService.login(credentials)

        // Parse response: { user: {...}, token: "..." }
        const { token, user } = response

        commit('SET_TOKEN', token)
        commit('SET_USER', user)

        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    logout({ commit }) {
      commit('LOGOUT')
    },

    async checkAuth({ commit, state }) {
      if (!state.token) return false

      try {
        const response = await authService.getUser()
        const user = response.user || response
        commit('SET_USER', user)
        return true
      } catch {
        commit('LOGOUT')
        return false
      }
    }
  }
})

export default store
