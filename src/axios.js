// src/axios.js
import axios from 'axios'
import store from './store'

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:6789' // 替换为你的 API 基础 URL
})

// 请求拦截器
instance.interceptors.request.use(config => {
  const userID = store.getters.userID
  if (userID) {
    config.headers['User-ID'] = userID // 在请求头中添加用户 ID
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default instance
