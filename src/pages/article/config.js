import config from 'config/index'

export const searchConf = [
  { field: 'title', label: '标题' },
  { field: 'subtitle', label: '副标题' }
]

export const formConf = [
  { name: 'title', label: '标题' },
  { name: 'subtitle', label: '副标题' },
  { name: 'detail', label: '详情', type: config.FORM.EDITOR }
]

export const tableConf = [
  { name: 'title', label: '标题', required: true },
  { name: 'subtitle', label: '副标题', required: true }
]

export const ArticleRules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  subtitle: [{ required: true, message: '请输入副标题', trigger: 'blur' }],
  detail: [{ required: true, message: '请输入详情', trigger: 'blur' }]
}
