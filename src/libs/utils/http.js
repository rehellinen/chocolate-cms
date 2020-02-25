import axios from 'axios'
import config from 'config'
import Vue from 'vue'
import { getAccessToken, getRefreshToken, saveTokens } from 'libs/utils/token'
import { ExpiredToken, ParamsException } from 'libs/exception'

const REFRESH_URL = 'user/refresh'
const TOTAL_REFRESH_URL = config.BASE_URL.endsWith('/')
  ? config.BASE_URL + REFRESH_URL
  : `${config.BASE_URL}/${REFRESH_URL}`

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

  // 增加权限相关header字段
  const getAuthHeader = (token) => `Bearer ${token}`
  if (reqConfig.url === REFRESH_URL) {
    const refreshToken = getRefreshToken()
    if (refreshToken !== 'undefined') {
      reqConfig.headers.Authorization = getAuthHeader(refreshToken)
    }
  } else {
    const accessToken = getAccessToken()
    if (accessToken !== 'undefined') {
      reqConfig.headers.Authorization = getAuthHeader(accessToken)
    }
  }
  return reqConfig
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
  processParamsError(res)
  // 处理refresh token过期
  processRefreshTokenError(res)
  // 处理access token过期
  const newRes = await processAccessTokenError(res, allReqConfig)
  return getResponseData(newRes || res)
}

const processParamsError = ({ status, data }) => {
  // 处理参数错误的情况
  if (status === 400) {
    for (const [key, val] of Object.entries(data.data)) {
      for (let msg of val) {
        if (process.env.NODE_ENV !== 'production') {
          msg = `${key} - ${msg}`
        }
        Vue.prototype.$message({
          message: msg,
          type: 'error'
        })
      }
    }
    throw ParamsException(data.message, data.data)
  }
}

const processRefreshTokenError = (response) => {
  const { status, data } = response
  if (response.config.url === TOTAL_REFRESH_URL) {
    // 令牌类型错误 / Token过期
    if (status === 20101 || status === 20102) {
      Vue.prototype.$message({
        message: data.message,
        type: 'error'
      })
      // TODO: 退出登录
      window.location.href = window.location.origin + '/#/login'
      throw ExpiredToken(data.message)
    }
  }
}

const processAccessTokenError = async ({ status, data }, allReqConfig) => {
  // 令牌类型错误 / Token过期
  if (status === 20101 || status === 20102) {
    const reFetch = allReqConfig.otherConfig.reFetch !== false
    if (reFetch) {
      // 刷新access_token
      const res = await post(REFRESH_URL)
      saveTokens(res.data.accessToken, res.data.refreshToken)
      // 重发请求
      if (reFetch) {
        allReqConfig.otherConfig.refetch = false
        return request(allReqConfig.url,
          allReqConfig.method,
          allReqConfig.data,
          allReqConfig.otherConfig
        )
      }
    } else {
      Vue.prototype.$message({
        message: '登录已过期',
        type: 'error'
      })
      throw ExpiredToken(data.message)
    }
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

    return await processResponse(response, {
      url,
      method,
      data,
      otherConfig
    })
  } catch (e) {
    if (e instanceof ParamsException) {
      // 参数错误的情况
    } else if (e instanceof ExpiredToken) {
      // Token过期的情况
    } else {
      throw e
    }
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
