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
    this.setDefault('Token已过期')
  }
}

class NoAuthority extends Exception {
  constructor (config) {
    super(config)
    this.setDefault('权限异常')
  }
}

export { ParamsException, ExpiredToken, NoAuthority }

