import { Exception } from 'libs/exception/Exception'

class NoValidationMethod extends Exception {
  constructor (msg, data) {
    super(msg, data)
    this.setDefault('找不到校验方法')
  }
}


class ValidationFailed extends Exception {
  constructor (msg, data) {
    super(msg, data)
    this.setDefault('校验不通过')
  }
}

export { NoValidationMethod, ValidationFailed }
