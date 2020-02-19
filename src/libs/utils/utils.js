export const toString = (value) => {
  if (value == null) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  return `${value}`
}

export const getToStringTag = (v) => Object.prototype.toString.call(v)

export const isFunction = (v) => {
  return getToStringTag(v) === '[object Function]' ||
  getToStringTag(v) === '[object AsyncFunction]' ||
  getToStringTag(v) === '[object GeneratorFunction]' ||
  getToStringTag(v) === '[object Proxy]'
}
