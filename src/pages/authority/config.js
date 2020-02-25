import config from 'config'

export const searchConf = [
  { field: 'name', label: '名称' },
  { field: 'authority', label: '分组' }
]

export const userTableConf = [
  { name: 'name', label: '名称' },
  { name: 'role.name', label: '分组' }
]

export const userFormConf = [
  { name: 'account', label: '账号' },
  { name: 'name', label: '名称' },
  { name: 'avatar', label: '头像', type: config.FORM.FILE },
  { name: 'roleId',
    label: '分组',
    type: config.FORM.SELECT,
    options: [
      {
        label: 'test',
        value: 'test'
      }
    ]
  }
]

export const userConf = [
  { name: 'account', label: '账号' },
  { name: 'name', label: '名称' },
  { name: 'password', label: '密码', hide: true },
  { name: 'avatar', label: '头像', type: config.FORM.FILE },
  { name: 'roleId',
    label: '分组',
    type: config.FORM.SELECT,
    options: [
      {
        label: 'test',
        value: 'test'
      }
    ]
  }
]

export const passwordFormConf = [
  { name: 'newPassword', label: '新密码', hide: true },
  { name: 'newPassword1', label: '确认新密码', hide: true }
]
