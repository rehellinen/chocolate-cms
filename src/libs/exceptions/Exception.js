import { isString } from 'libs/utils/utils'

class Exception extends Error {
  constructor (msg, data) {
    super()
    if (isString(msg)) {
      this.message = msg
    }
    if (data) {
      this.data = data
    }
  }

  setDefault (msg, data) {
    if (isString(msg) && !isString(this.message)) {
      this.message = msg
    }
    if (data && !Reflect.has(this, 'data')) {
      this.data = data
    }
  }

  getInfo () {
    return {
      message: this.message,
      data: this.data
    }
  }
}

export { Exception }
