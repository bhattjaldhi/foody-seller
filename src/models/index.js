import {
  Model as BaseModel
} from 'vue-api-query'
import {
  store
} from 'src/store'

export default class Model extends BaseModel {

  // define a base url for a REST API
  baseURL() {
    return process.env.BASE_API_URL
  }

  // implement a default request method 
  request(config) {
    config.headers = {
      Authorization: `Bearer ${store.state.auth.token}`,
      Accept: 'application/json'
    }
    return this.$http.request(config)
  }

}
