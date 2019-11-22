/**
 *  utils.js
 *  Create By rehellinen
 *  Create On 2019/3/3 10:42
 */
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
