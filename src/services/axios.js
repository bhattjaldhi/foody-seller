import axios from 'axios/index'

const instance = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 3000
});


export default instance
