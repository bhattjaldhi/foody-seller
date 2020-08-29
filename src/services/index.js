import Auth from './modules/auth.js'

export const API_BASE = process.env.BASE_API_URL


export default function Api(store) {


  return {
    baseUrl: API_BASE,
    token: null,
    $store: store,
    auth: Auth(store),
  }
}


export function config(store) {
  return {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${store.state.auth.token }`
    }
  }
}
