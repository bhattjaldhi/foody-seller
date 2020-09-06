import axios from 'axios/index'

const instance = axios.create({
  // TODO: process.env.BASE_API_URL
  baseURL: process.env.BASE_API_URL,
  timeout: 3000
});


export default instance
