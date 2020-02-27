import validator from 'validator'
import { hasOwn, isFunction } from '../utils'
import { NoValidationMethod, ValidationFailed } from 'libs/exception'

/**
 * rule装饰器
 * @param funcName 验证函数名称
 * @param errInfo 错误信息
 * @param params 传入验证函数的其他参数（可以有多个）
 * @returns {Function}
 */
export const rule = (funcName, errInfo, ...params) => {
  return (target, key, descriptor) => {
    const defaultVal = descriptor.initializer && descriptor.initializer.call(this)
    let rules = target.constructor._rules
    if (!rules) {
      target.constructor._rules = rules = {}
    }
    if (!rules[key]) {
      rules[key] = []
    }
    if (defaultVal != null || funcName === 'optional') {
      rules[key]._option = true
      rules[key]._default = defaultVal
    }
    if (funcName !== 'optional') {
      // 由验证函数名称、错误提示信息、验证函数额外参数构成的数组
      rules[key].push([funcName, errInfo, params])
    }
  }
}

export function proxy (target, sourceKey, key) {
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function proxyGetter () {
      return this[sourceKey][key]
    },
    set: function proxySetter (val) {
      this[sourceKey][key] = val
    }
  })
}

const methods = {
  require (key, value, params) {
    if (typeof value === 'string') {
      value = value.trim()
    }
    return value != null && value !== ''
  }
}

export class BaseModel {
  // 原始的参数列表
  rawParams = {}

  // 经过验证和转型后的参数列表
  checkedParams = {}

  // 场景配置
  scene = {}

  // 错误信息
  errors = {}

  // 当前验证的场景
  _scene = ''

  // 当前正在处理的数据的Key
  _key = ''

  // 当前正在处理的数据的Value
  _value = ''

  constructor (data, options = {}) {
    const { scene } = options
    this.rawParams = data
    this._scene = scene
  }

  // TODO: create_time等等公用字段怎么处理
  init () {
    for (let key of Object.keys(this.rawParams)) {
      if (hasOwn(this, key)) {
        proxy(this, 'checkedParams', key)
      }
    }
    this.check()
  }

  /**
   * 验证主方法
   */
  check () {
    const scene = this._scene
    // 获取该场景需要验证的所有字段
    const keys = this.scene[scene]
    // 获取所有字段的所有验证规则
    const allRules = this.constructor._rules
    for (const key of keys) {
      this._key = key
      this._value = this.rawParams[key]

      const rules = allRules[key]
      if (!rules || rules.length === 0) {
        const msg = `[Validator] ${this.constructor.name}验证器中，${scene}场景中指定的${key}字段没有定义规则`
        throw new NoValidationMethod(msg)
      }

      if (rules._option && !this._value.trim()) {
        // 处理默认值的情况。undefined、null、''、'   '均视为未传值
        if (isFunction(rules._default)) {
          rules._default = rules._default()
        }
        if (rules._default != null) {
          this.checkedParams[key] = rules._default
        }
      } else {
        for (const rule of rules) {
          this._validate(rule)
        }
        this._convertDataType(rules)
      }
    }
    if (Object.keys(this.errors).length > 0) {
      console.log(this.errors)
      throw new ValidationFailed('校验不通过', this.errors)
    }
  }

  /**
   * 转换数据类型
   * @param rules
   */
  _convertDataType (rules) {
    let value = this._value
    const funcNames = rules.map((item) => item[0])

    if (funcNames.includes('isInt') || rules._type === 'int') {
      value = validator.toInt(value)
    } else if (funcNames.includes('isFloat') || rules._type === 'float') {
      value = validator.toFloat(value)
    } else if (funcNames.includes('isBoolean') || rules._type === 'boolean') {
      value = validator.toBoolean(value)
    }

    this.checkedParams[this._key] = value
  }

  /**
   * 使用验证函数进行验证
   * @param rule 由[funcName（函数名）, errInfo（错误提示）, funcParams（额外参数）]组成
   */
  _validate (rule) {
    const [funcName, errInfo, funcParams] = rule
    const validate = (func) => {
      const key = this._key
      const val = this.rawParams[this._key]
      const res = func(key, val, this.rawParams, ...funcParams)
      if (!res) {
        this._addError(errInfo)
      }
    }


    if (isFunction(this[funcName])) {
      // 优先使用自定义验证函数
      validate(this[funcName])
    } else if (isFunction(methods[funcName])) {
      // 优先使用自定义验证函数
      validate(methods[funcName])
    } else if (isFunction(validator[funcName])) {
      // 第三方库 - validator.js
      if (!validator[funcName](this._value, ...funcParams)) {
        this._addError(errInfo)
      }
    } else {
      throw new NoValidationMethod(`未找到验证器方法${funcName}`)
    }
  }

  /**
   * 保存错误信息
   * @param errInfo 错误信息
   */
  _addError (errInfo) {
    const key = this._key
    if (!Array.isArray(this.errors[key])) {
      this.errors[key] = []
    }
    this.errors[key].push(errInfo)
  }
}
