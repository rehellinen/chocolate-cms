export const authFormConf = [
  { name: 'name', label: '权限名称' },
  { name: 'desc', label: '权限描述' }
]

export const manageTableConf = [
  { name: 'name', label: '名称' },
  { name: 'desc', label: '权限描述' }
]

export const authRules = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入描述', trigger: 'blur' }]
}
