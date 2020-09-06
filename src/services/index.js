import Auth from './modules/auth'
import Firebase from './modules/firebase'

export const API_BASE = process.env.BASE_API_URL


export default function Api(store) {


  return {
    baseUrl: API_BASE,
    token: null,
    $store: store,
    auth: Auth(store),
    firebase: Firebase(store),
  }
}


export function config(store) {
  console.log('AuthToken: ', store.state.auth.token)
  return {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${store.state.auth.token }`
    }
  }
}
