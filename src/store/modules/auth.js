const state = {
  token: null,
  exp: null
}

const mutations = {
  login: (state, payload) => {
    state.token = payload.token
    state.user = payload.user
    state.exp = new Date().getTime() / 1000 + 3600 * 24 * 30
  },
  logout: (state, payload) => {
    state.token = null
    state.user = null
    state.exp = new Date().getTime() / 1000
  }
}

const actions = {

}

const getters = {
  authenticated: state => {
    return (state.token !== null) && (state.exp >= (new Date().getTime() / 1000))
  },
  user: state => {
    return state.user
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
