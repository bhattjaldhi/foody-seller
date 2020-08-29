import Model from './'
import Shop from './shops'

export default class User extends Model {
  resource() {
    return 'users'
  }

  shop () {
    return this.hasMany(Shop)
  }
  

  static current(store){
    return store.state.auth.user
  }
}
