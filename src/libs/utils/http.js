import axios from 'axios'
import config from 'config'

const processConfig = (config) => {
}

const precessData = (data) => {
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
  // 处理跨域的api，http://127.0.0.1:3000/
  if (config.url.indexOf('mock') === -1) {
    console.log(123)
    config.baseURL += '/api/'
  }
  // 处理data字段
  config.data = precessData(config.data)
  return config
})

http.interceptors.response.use(res => {
  return res.data.data
})

export const request = (url, method, data, otherConfig) => {
  return http({
    url,
    method,
    data,
    ...otherConfig
  })
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
