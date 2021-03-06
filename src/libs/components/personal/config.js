export const passwordFormConf = {
  name: '修改密码',
  form: [
    { name: 'oldPassword', label: '旧密码', hide: true },
    { name: 'newPassword', label: '新密码', hide: true },
    { name: 'newPassword1', label: '确认密码', hide: true }
  ]
}

export const lockedFormConf = {
  name: '锁定',
  form: [
    { name: 'password', label: '锁定密码', hide: true }
  ]
}

export const lockPasswordRules = {
  password: [{ required: true, message: '请输入六位密码', trigger: 'blur', min: 6, max: 6 }]
}

export const passwordRules = {
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
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
