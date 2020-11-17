import User from "src/models/users";


const state = {
  token: null,
  exp: null,
  user: null
}

const mutations = {
  user(state, payload) {
    state.user = payload
  },
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
  async getUserDetails({
    commit,
    state
  }) {
    try {
      let users = await User.include('shop').where('id', state.user.id).$get()
      if (users.length) {
        commit('user', users[0])
      }
    } catch (error) {
      console.error(error)
    }
  }
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
