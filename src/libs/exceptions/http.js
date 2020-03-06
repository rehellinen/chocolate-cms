import { Exception } from 'libs/exceptions/Exception'

class ParamsException extends Exception {
  constructor (msg, data) {
    super(msg, data)
    this.setDefault('参数错误')
  }
}

class NoAuthority extends Exception {
  constructor (msg, data) {
    super(msg, data)
    this.setDefault('权限异常')
  }
}

export { ParamsException, NoAuthority }

