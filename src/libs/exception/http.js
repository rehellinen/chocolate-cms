import { Exception } from 'libs/exception/Exception'

class ParamsException extends Exception {
  constructor (msg, data) {
    super(msg, data)
    this.setDefault('参数错误')
  }
}

class ExpiredToken extends Exception {
  constructor (config) {
    super(config)
    this.setDefault({
      httpCode: 401,
      status: 20101,
      message: 'Token已过期'
    })
  }
}

export { ParamsException, ExpiredToken }

