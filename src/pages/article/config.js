/**
 *  config.js
 *  Create By rehellinen
 *  Create On 2019/5/21 10:36
 */
import config from 'config/config'

export const searchConf = [
  { field: 'title', label: '标题' },
  { field: 'subtitle', label: '副标题' }
]

export const formConf = [
  { name: 'title', label: '标题' },
  { name: 'subtitle', label: '副标题' },
  { name: 'file', label: '图片', type: config.FORM.FILE },
  { name: 'content', label: '内容', type: config.FORM.EDITOR }
]

export const tableConf = [
  { name: 'title', label: '标题' },
  { name: 'subtitle', label: '副标题' }
]
