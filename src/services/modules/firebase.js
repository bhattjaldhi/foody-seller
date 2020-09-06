import axios from 'src/services/axios'
import {
  config
} from 'src/services'

export default (store) => {
  return {
    $store: store,
    async getGroup(notificationKey) {
      return axios.get(`/fcm/get-group?notification_key=${notificationKey}`, config(store)).then(
        response => {
          return response.data
        }
      ).catch(error => {
        throw error
      })
    },
    async createGroup(data) {
      return axios.post('/fcm/create-group', data, config(store)).then(
        response => {
          return response.data
        }
      ).catch(error => {
        throw error
      })
    },
  }
}
