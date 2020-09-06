import axios from 'src/services/axios'

export default (store) => {
  return {
    $store: store,
    login(data) {
      return axios.post('/login', data).then(
        response => {
          this.$store.commit('login', response.data)
          return response.data
        }
      ).catch(error => {
        throw error
      })
    },
    logout() {
      this.$store.commit('logout')
    }
  }
}
