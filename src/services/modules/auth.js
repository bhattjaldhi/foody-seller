import axios from 'src/services/axios'
import {
  config as ApiConfig
} from '..'

export default (store) => {
  return {
    $store: store,
    login(data) {
      return axios.post('/login', data).then(
        response => {
          this.$store.commit('login', response.data)
          return response
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
