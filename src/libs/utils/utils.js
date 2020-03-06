import config, * as routerConfig from 'config/index'

/**
 * 格式化数据
 * @param thisDate Date实例
 * @param fmt 格式
 * @returns {string}
 */
export const dateFormat = (thisDate, fmt = 'YYYY-MM-dd hh:mm:ss') => {
  let days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const o = {
    'Y+': thisDate.getFullYear(), // 年
    'M+': thisDate.getMonth() + 1, // 月
    'd+': thisDate.getDate(), // 日
    'h+': thisDate.getHours(), // 时
    'm+': thisDate.getMinutes(), // 分
    's+': thisDate.getSeconds(), // 秒
    'q': days[thisDate.getDay()] // 星期
  }
  if (/(y+)/.test(fmt)) { // 年
    fmt = fmt.replace(RegExp.$1, (thisDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
 * Base64转为File对象
 * @param urlData base64数据
 * @returns {File|boolean}
 */
export const base64ToFile = (urlData) => {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)

  if (!mime) {
    return false
  }
  mime = (mime && mime[1])
  let postfix = mime.match(/\/(.*)/)[1]
  // 转换为byte
  let bytes = window.atob(arr[1])
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  // 生成视图
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  // 转换成文件，添加文件的type，name属性
  return new File([ia], (new Date()).getTime() + '.' + postfix, { type: mime })
}

/**
 * 获取一段随机字符串
 * @param length 字符串长度
 * @returns {string}
 */
export const getRandChars = (length = 16) => {
  let str = ''
  let strPol = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let max = strPol.length - 1

  for (let i = 0; i < length; i++) {
    str += strPol[Math.floor(Math.random() * max)]
  }

  return str
}

// 将一个变量转为字符串（null, undefined转为空字符串）
export const toString = (value) => {
  if (value == null) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  return `${value}`
}

// Object.toString的返回值
export const getToStringTag = (v) => Object.prototype.toString.call(v)

// 判断是否为函数
export const isFunction = (v) => {
  return getToStringTag(v) === '[object Function]' ||
  getToStringTag(v) === '[object AsyncFunction]' ||
  getToStringTag(v) === '[object GeneratorFunction]' ||
  getToStringTag(v) === '[object Proxy]'
}

// 判断是否为字符串
export const isString = (v) => typeof v === 'string'

// 对象本身上是否存在该key
export function hasOwn (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// 判断是否为对象
export const isObject = (value) => value !== null && (typeof value === 'object')

// 判断是否为原生方法
export function isNative (value) {
  return typeof value === 'function' && /native code/.test(value.toString())
}

// 将this[sourceKey][key]代理到this[key]
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

// 深度遍历所有节点
export const deepTraversalAll = (config, cb) => {
  if (Array.isArray(config)) {
    config.forEach(item => deepTraversalAll(item, cb))
  } else if (config.children && config.children.length > 0) {
    cb(config)
    config.children.forEach(item => deepTraversalAll(item, cb))
  } else {
    cb(config)
  }
}

// 深度遍历叶子节点
export const deepTraversalLeaf = (config, cb) => {
  // 当config为数组 / config有children属性的时候，不加入路由
  if (Array.isArray(config)) {
    config.forEach(item => deepTraversalLeaf(item, cb))
  } else if (config.children && config.children.length > 0) {
    config.children.forEach(item => deepTraversalLeaf(item, cb))
  } else {
    cb(config)
  }
}

// 获取所有的路由配置
export const getAllConfig = () => {
  const allConfig = []
  config.ROUTER_CONF_FILES.forEach(name => {
    const config = routerConfig[name]
    allConfig.push(...config)
  })
  return allConfig
}

// 将传入函数当成宏任务
export const macroTask = task => {
  setTimeout(task, 0)
}
