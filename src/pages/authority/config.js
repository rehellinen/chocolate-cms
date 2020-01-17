import config from 'config'

export const searchConf = [
  { field: 'name', label: '名称' },
  { field: 'authority', label: '分组' }
]

export const userTableConf = [
  { name: 'name', label: '名称' },
  { name: 'authority', label: '分组' }
]

export const userFormConf = [
  { name: 'name', label: '名称' },
  { name: 'password', label: '密码' },
  { name: 'password2', label: '确认密码' },
  { name: 'authority',
    label: '分组',
    type: config.FORM.SELECT,
    options: [
      {
        label: 'test1',
        value: 'test1'
      },
      {
        label: 'test2',
        value: 'test2'
      }
    ]
  }
]

export const manageTableConf = [
  { name: 'authority', label: '名称' },
  { name: 'describe', label: '信息' }
]

export const manageFormConf = [
  { name: 'authority', label: '名称' },
  { name: 'describe', label: '分组信息' }
]
