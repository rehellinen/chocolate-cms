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

export const passwordRules = {
  password: [{ required: true, message: '请输入六位密码', trigger: 'blur', min: 6, max: 6 }]
}
