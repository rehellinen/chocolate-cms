import config from 'config'

export const formConf = [
  { name: 'input', label: '标题' },
  { name: 'file', label: '禁用', type: config.FORM.DISABLED },
  { name: 'file', label: '图片', type: config.FORM.FILE },
  { name: 'file', label: '开关', type: config.FORM.SWITCH },
  { name: 'file', label: '滑块', type: config.FORM.SLIDER, value: 50 },
  { name: 'file', label: '时间', type: config.FORM.DATE },
  { name: 'content', label: '内容', type: config.FORM.EDITOR }
]
