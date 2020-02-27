import config from 'config'

export const formConf = [
  { name: 'input', label: '标题' },
  { name: 'disabled', label: '禁用', type: config.FORM.DISABLED },
  { name: 'file', label: '图片', type: config.FORM.FILE },
  { name: 'switch', label: '开关', type: config.FORM.SWITCH },
  { name: 'slide', label: '滑块', type: config.FORM.SLIDER, value: 50 },
  { name: 'date', label: '时间', type: config.FORM.DATE },
  { name: 'content', label: '内容', type: config.FORM.EDITOR }
]
