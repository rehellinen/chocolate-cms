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
  { name: 'avatar', label: '头像', type: config.FORM.FILE, limit: 1, accept: 'image/*' },
  { name: 'role.id',
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
  { name: 'avatar', label: '头像', type: config.FORM.FILE, limit: 1, accept: 'image/*' },
  { name: 'role.id',
    label: '分组',
    type: config.FORM.SELECT,
    options: [
      {
        label: '分组名称',
        value: '分组id'
      }
    ]
  }
]

export const passwordFormConf = [
  { name: 'newPassword', label: '新密码', hide: true },
  { name: 'newPassword1', label: '确认密码', hide: true }
]

export const UserRules = {
  account: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  avatar: [{ required: true, message: '请选择头像', trigger: 'blur' }],
  'role.id': [{ required: true, message: '请选择分组', trigger: 'blur' }]
}

// TODO：支持自定义函数
export const passwordRules = {
  newPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  newPassword1: [
    {
      required: true,
      confirm: {
        name: 'newPassword',
        desc: '密码'
      },
      trigger: 'blur'
    }]
}

