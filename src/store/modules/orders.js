const state = {
  orders: [],
}

const mutations = {
  orders(state, payload) {
    state.orders = payload
  },
  addToOrders(state, payload) {
    state.orders.unshift(payload)
  },
  updateOrder(state, payload) {
    state.orders = payload
  }
}

const actions = {
  updateOrder({
    commit,
    state
  }, payload) {
    let _orders = [...state.orders]
    let foundIndex = _orders.findIndex(x => x.id === payload.id)
    _orders[foundIndex] = payload
    commit('updateOrder', _orders)
  }
}

const getters = {
  orders: state => {
    return state.orders
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
