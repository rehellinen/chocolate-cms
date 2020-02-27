import config from 'config'

export const roleFormConf = [
  { name: 'name', label: '分组名称' },
  { name: 'desc', label: '分组描述' },
  { name: 'authority',
    label: '权限',
    type: config.FORM.SWITCH
  }
]

export const manageTableConf = [
  { name: 'name', label: '名称' },
  { name: 'desc', label: '分组描述' }
]
