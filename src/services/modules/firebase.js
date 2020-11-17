import axios from 'src/services/axios'
import {
  config
} from 'src/services'


import {
  FCM_BASE_URL,
  firebaseConfig as Config
} from "src/services";

export default (store) => {
  return {
    $store: store,
    sendNotification(to, title, message, data) {
      let fcmObj = {
        to: to,
        notification: {
          title: title,
          body: message,
          sound: 'default'
        },
        data: data,
        webpush: {
          headers: {
            "Urgency": "high"
          },
          notification: {
            body: message,
            requireInteraction: "true",
          }
        }
      }
      return axios(Object.assign(
          Config(store), {
            method: "post",
            url: FCM_BASE_URL + `/send`,
            data: JSON.stringify(fcmObj)
          }
        ))
        .then(response => {
          return response.data;
        })
        .catch(error => {
          throw error;
        });
    },
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
