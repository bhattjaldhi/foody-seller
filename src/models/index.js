import {
  Model as BaseModel
} from 'vue-api-query'
import {
  store
} from 'src/store'
import {
  config as ApiConfig
} from 'src/services'



export default class Model extends BaseModel {

  // define a base url for a REST API
  baseURL() {
    return process.env.BASE_API_URL
  }

  // implement a default request method 
  request(config) {
    return this.$http.request(Object.assign(config, ApiConfig(store)))
  }

}
