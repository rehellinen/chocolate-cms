import validator from 'validator'
import Vue from 'vue'
import { isFunction, toString, isObject, proxy, macroTask } from '../utils'
import { NoValidationMethod, ValidationFailed } from 'libs/exceptions'

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

const methods = {
  require (key, value, params) {
    if (typeof value === 'string') {
      value = value.trim()
    }
    return value != null && value !== ''
  },
  isObject (key, value, params) {
    return isObject(value)
  }
}

export class Validator {
  // 场景配置
  scene = {}

  // 原始的参数列表
  _rawParams = {}

  // 经过验证和转型后的参数列表
  _checkedParams = {}

  // 错误信息
  _errors = {}

  // 当前验证的场景
  _scene = ''

  // 当前正在处理的数据的Key
  _key = ''

  // 当前正在处理的数据的Value
  _value = ''

  constructor (data, options = {}) {
    const { scene, errorHandler } = options
    this._rawParams = data
    this._scene = scene
    this._errorHandler = errorHandler
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
      this._value = isObject(this._rawParams[key])
        ? this._rawParams[key]
        : toString(this._rawParams[key])

      const rules = allRules[key]
      if (!rules || rules.length === 0) {
        const msg = `[Validator] ${this.constructor.name}验证器中，${scene}场景中指定的${key}字段没有定义规则`
        throw new NoValidationMethod(msg)
      }

      if (rules._option && !this._value) {
        // 处理默认值的情况。undefined、null、''、'   '均视为未传值
        if (isFunction(rules._default)) {
          rules._default = rules._default()
        }
        if (rules._default != null) {
          this._checkedParams[key] = rules._default
        }
      } else {
        for (const rule of rules) {
          this._validate(rule)
        }
        this._convertDataType(rules)
      }

      proxy(this, '_checkedParams', key)
    }

    const errEntries = Object.entries(this._errors)
    if (errEntries.length > 0) {
      if (this._errorHandler && isFunction(this._errorHandler)) {
        // 用户自行处理异常
        this._errorHandler(this._errors)
      } else {
        for (let [key, errs] of errEntries) {
          for (let err of errs) {
            macroTask(() => {
              Vue.prototype.$notify({
                message: process.env.NODE_ENV === 'production' ? err : `${key} - ${err}`,
                type: 'error'
              })
            })
          }
        }
        throw new ValidationFailed('校验不通过', this._errors)
      }
    }
  }

  /**
   * 转换数据类型
   * @param rules
   */
  _convertDataType (rules) {
    let value = this._value
    const funcNames = rules.map((item) => item[0])

    if (funcNames.includes('isInt')) {
      value = validator.toInt(value)
    } else if (funcNames.includes('isFloat')) {
      value = validator.toFloat(value)
    } else if (funcNames.includes('isBoolean')) {
      value = validator.toBoolean(value)
    }

    this._checkedParams[this._key] = value
  }

  /**
   * 使用验证函数进行验证
   * @param rule 由[funcName（函数名）, errInfo（错误提示）, funcParams（额外参数）]组成
   */
  _validate (rule) {
    const [funcName, errInfo, funcParams] = rule
    const validate = (func) => {
      const res = func(
        this._key,
        this._value,
        this._rawParams,
        ...funcParams
      )
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
    if (!Array.isArray(this._errors[key])) {
      this._errors[key] = []
    }
    this._errors[key].push(errInfo)
  }
}
