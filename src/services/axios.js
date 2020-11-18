import axios from 'axios/index'

axios.interceptors.response.use(res => {
  console.log(res);
  // Important: response interceptors **must** return the response.
  return res;
});

const instance = axios.create({
  // TODO: process.env.BASE_API_URL
  baseURL: process.env.BASE_API_URL,
  timeout: 10000
});

export default instance
