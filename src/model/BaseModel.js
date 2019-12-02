/**
 *  BaseModel.js
 *  Create By rehellinen
 *  Create On 2019/3/4 11:34
 */
import axios from 'axios'
import config from 'config/config'
import { Token } from 'libs/class/Token'

export class BaseModel {
  constructor (modelName) {
    this.modelName = modelName
    this.baseUrl = config.REST_URL
  }

  /**
   * 对 axios 请求进行封装
   * @param params 请求参数配置
   *  params参数:
   *  1. url String [api地址]
   *  2. method String [http请求方式]
   *  3. data Object [请求时携带的参数]
   *  4. message Boolean [是否在结果中携带message]
   *  5. contentType String [设置content-type]
   */
  async request ({ url, reqData, message, method = 'get', contentType = 'application/json' }) {
    const token = new Token().getTokenFromCache()
    const config = {
      url: `${this.baseUrl}/${url.startsWith('/') ? url.substr(1) : url}`,
      method: method,
      headers: {
        token,
        'content-type': contentType
      },
      validateStatus: (status) => status <= 500
    }
    method === 'get' ? config.params = reqData : config.data = reqData
    const res = await axios(config)
      .catch(ex => {
        console.log(ex)
      })
    const status = res.status
    const data = res.data

    // 需要处理的几种情况：
    // 1. 400 --- 参数错误
    // 2. 401 --- token无效
    // 3. 404 --- 找不到资源
    // 4. 500 --- 服务器错误

    // 服务器错误
    if (status === 500) {
      data.isError = true
      return data
    }

    // 资源找不到
    if (status === 404) {
      data.isError = true
      return data
    }

    // 参数错误
    if (status === 400) {
      data.isError = true
      return data
    }

    // Token过期
    if (status === 401) {
      data.isExpired = true
      data.isError = true
      return data
    }

    // 成功
    if (status === 200) {
      return message ? data : data.data
    }
  }

  async addData (reqData) {
    return this.request({
      url: this.modelName,
      reqData,
      method: 'post',
      message: true
    })
  }

  async editData (reqData) {
    return this.request({
      url: this.modelName,
      reqData,
      method: 'put',
      message: true
    })
  }

  async deleteData (id) {
    return this.request({
      url: this.modelName,
      method: 'delete',
      reqData: { id },
      message: true
    })
  }

  async changeStatus (id, status) {
    return this.request({
      url: `${this.modelName}/status`,
      method: 'put',
      reqData: { id, status },
      message: true
    })
  }

  async changeOrder (id, order) {
    return this.request({
      url: `${this.modelName}/order`,
      method: 'put',
      reqData: { id, order },
      message: true
    })
  }

  async getById (id) {
    return this.request({
      url: `${this.modelName}/one`,
      method: 'get',
      reqData: { id },
      message: false
    })
  }

  async getAll (reqData) {
    return this.request({
      url: `${this.modelName}/all`,
      reqData: Object.assign({ isPage: true }, reqData),
      method: 'get',
      message: false
    })
  }

  async getNormal () {
    return this.request({
      url: `${this.modelName}/normal`,
      method: 'get',
      message: false
    })
  }

  async search (data) {
    return this.request({
      url: `${this.modelName}/search`,
      reqData: data,
      method: 'get',
      message: false
    })
  }

  async getCount () {
    return this.request({
      url: `${this.modelName}/count`,
      method: 'get',
      message: false
    })
  }
}
