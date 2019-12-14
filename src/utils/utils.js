export const deepCopyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// 日期格式化
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

export const getRandChars = (length = 16) => {
  let str = ''
  let strPol = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let max = strPol.length - 1

  for (let i = 0; i < length; i++) {
    str += strPol[Math.floor(Math.random() * max)]
  }

  return str
}

export const base64ToBlob = (urlData, type = '') => {
  let arr = urlData.split(',')
  let mime = arr[0].match(/:(.*?);/)[1] || type
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1])
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {
    type: mime
  })
}

