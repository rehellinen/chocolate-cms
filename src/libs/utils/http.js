import axios from 'axios'
import config from 'config'
import Vue from 'vue'
import { getAccessToken, getRefreshToken } from 'libs/utils/token'

const processConfig = (config) => {
  // 删除axios不需要的配置项
  delete config.getAllResponse
}

const precessData = (config) => {
  const data = config.data
  return data
}

const processAuth = (config) => {
  const getAuthHeader = (token) => `Bearer ${token}`
  if (config.url === 'user/refresh') {
    const refreshToken = getRefreshToken()
    if (refreshToken) {
      config.headers.Authorization = getAuthHeader(refreshToken)
    }
  } else {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = getAuthHeader(accessToken)
    }
  }
}

const http = axios.create({
  baseURL: config.BASE_URL,
  timeout: 5000,
  // 所有响应情况都在拦截器中处理
  validateStatus: (status) => status >= 200 && status < 510
})

http.interceptors.request.use(config => {
  // 增加容错率
  processConfig(config)
  // 处理data字段
  precessData(config)
  // 处理跨域的api，http://127.0.0.1:3000/
  if (config.url.indexOf('mock') === -1) {
    config.baseURL += '/api/'
  }
  processAuth(config)
  return config
})

http.interceptors.response.use(res => {
  const { status, data } = res
  const error = (msg) => {
    Vue.prototype.$message({
      message: msg,
      type: 'error'
    })
  }

  // 处理参数错误的情况
  if (status === 400) {
    for (const [key, val] of Object.entries(data.data)) {
      for (let msg of val) {
        if (process.env.NODE_ENV !== 'production') {
          msg = `${key} - ${msg}`
        }
        error(msg)
      }
    }
    throw new Error(data.message)
  }

  return res
})

export const request = async (url, method, data, config = {}) => {
  // 该配置项表示是否返回所有的数据，为false时只返回res.data
  const getAllResponse = config.getAllResponse
  const res = await http({
    url,
    method,
    data,
    ...config
  })
  return getAllResponse ? res.data : res.data.data
}

export const get = (url, data, otherConfig) => {
  return request(url, 'get', data, otherConfig)
}

export const post = (url, data, otherConfig) => {
  return request(url, 'post', data, otherConfig)
}

export const put = (url, data, otherConfig) => {
  return request(url, 'put', data, otherConfig)
}

export const del = (url, data, otherConfig) => {
  return request(url, 'delete', data, otherConfig)
}

export const uploadImg = (url, data) => {
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post('files/image', data, config).then(res => {
    return res.data.data
  })
}
