import axios from 'axios'
import config from 'config'
import Vue from 'vue'
import store from '@/store'
import { getAccessToken, getRefreshToken, saveAccessToken } from 'libs/utils/token'
import { ParamsException, NoAuthority } from 'libs/exceptions'

// TODO：给refresh token过期一个特定的status
const REFRESH_URL = 'user/refresh'

const processConfig = (reqConfig) => {
  // 默认使用get请求
  if (!reqConfig.method) {
    reqConfig.method = 'GET'
  }
  reqConfig.method = reqConfig.method.toUpperCase()

  // headers默认值
  if (!reqConfig.headers) {
    reqConfig.headers = {}
  }
  if (!reqConfig.headers['Content-Type']) {
    reqConfig.headers['Content-Type'] = 'application/json'
  }

  // GET方法下，data转为params
  if (reqConfig.method === 'GET') {
    if (!reqConfig.params) {
      reqConfig.params = reqConfig.data
    }
  }

  // 增加权限相关的header字段
  addAuthHeader(reqConfig)

  return reqConfig
}

const addAuthHeader = (conf) => {
  const token = conf.url === REFRESH_URL
    ? getRefreshToken()
    : getAccessToken()
  if (token) {
    conf.headers.Authorization = `Bearer ${token}`
  }
}

const processResponse = async (res, allReqConfig) => {
  const { status } = res
  const { otherConfig } = allReqConfig
  const getResponseData = (response) => {
    return otherConfig.getAllResponse ? response.data : response.data.data
  }
  // 处理成功的情况
  if (status >= 200 && status < 300) {
    return getResponseData(res)
  }
  // 处理参数错误
  processParamsError(res, otherConfig.throwErr)
  // 处理refresh token过期
  processRefreshTokenError(res)
  // 处理access token过期
  const newRes = await processAccessTokenError(res, allReqConfig)
  return newRes || getResponseData(res)
}

const processParamsError = (res, throwErr = false) => {
  const { status, data } = res
  // 处理参数错误的情况
  if (status === 400) {
    for (const [key, val] of Object.entries(data.data)) {
      for (let msg of val) {
        setTimeout(() => {
          Vue.prototype.$notify({
            message: process.env.NODE_ENV === 'production'
              ? msg
              : `${key} - ${msg}`,
            type: 'error'
          })
        }, 0)
      }
    }
    if (throwErr) {
      throw new ParamsException(data.message, res)
    }
  }
}

const processRefreshTokenError = (response) => {
  const { data } = response
  const { status } = data
  const TOTAL_REFRESH_URL = config.BASE_URL.endsWith('/')
    ? config.BASE_URL + REFRESH_URL
    : `${config.BASE_URL}/${REFRESH_URL}`
  if (response.config.url === TOTAL_REFRESH_URL) {
    // 令牌类型错误 / Token过期
    if (status === 20100 || status === 20200) {
      Vue.prototype.$notify({
        message: data.message,
        type: 'error'
      })
      store.dispatch('logout')
      throw new NoAuthority('refresh token已过期')
    }
  }
}

const processAccessTokenError = async (response, allReqConfig) => {
  const { data } = response
  const { status } = data
  if (status === 20100 || status === 20200) {
    // 令牌类型错误 / Token过期的情况
    const reFetch = allReqConfig.otherConfig.reFetch !== false
    if (reFetch) {
      // 刷新access_token
      const data = await post(REFRESH_URL)
      saveAccessToken(data.accessToken)
      // 重发请求
      allReqConfig.otherConfig.refetch = false
      return request(allReqConfig.url,
        allReqConfig.method,
        allReqConfig.data,
        allReqConfig.otherConfig
      )
    }
  } else if (status === 20300 || status === 20400) {
    // 认证失败或者权限不足的情况
    if (allReqConfig.otherConfig.throwErr) {
      throw new NoAuthority(data.message, response)
    }
    Vue.prototype.$notify({
      message: data.message,
      type: 'error'
    })
  }
}

const http = axios.create({
  baseURL: config.BASE_URL,
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 510
})

export const request = async (url, method, data, otherConfig = {}) => {
  try {
    const allReqConfig = processConfig({
      url,
      method,
      data
    })
    const response = await http(allReqConfig)
    return processResponse(response, {
      url,
      method,
      data,
      otherConfig
    })
  } catch (e) {
    if (e.message === 'Network Error') {
      Vue.prototype.$notify({
        message: '网络异常，请稍后再试',
        type: 'error'
      })
    }
    throw e
  }
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

export const uploadFile = (data) => {
  let configs = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  let url = 'files/image'
  let formData = new FormData()
  for (const [key, val] of Object.entries(data)) {
    formData.append(key, val)
  }

  return post(url, formData, configs)
}
