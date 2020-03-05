import config from 'config/index'

export const roleFormConf = [
  { name: 'name', label: '分组名称' },
  { name: 'desc', label: '分组描述' }
]

export const manageTableConf = [
  { name: 'name', label: '名称' },
  { name: 'desc', label: '分组描述' }
]

export const authFormConf = [
  {
    name: 'auth',
    label: '权限组',
    type: config.FORM.CHECKBOX,
    group: true,
    options: {
      'name': [
        {
          label: '权限描述',
          value: '权限id'
        }
      ]
    }
  }
]
