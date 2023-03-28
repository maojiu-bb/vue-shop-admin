import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_2,
  timeout: 5000
})

request.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  (err) => {
    console.log(err)
    return Promise.reject(new Error('fail'))
  }
)

request.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return err
  }
)

export default request
