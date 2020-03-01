import { Validator, rule } from 'libs/utils'

export class UserValidator extends Validator {
  scene = {
    // TODO: 还差order和role未检验
    get: ['account', 'name', 'avatar', 'role']
  }

  @rule('require', '名称不能为空')
  name

  @rule('require', '登录账户不能为空')
  account

  @rule('require', '密码不能为空')
  password

  @rule('require', '原密码不能为空')
  oldPassword

  @rule('require', '新密码不能为空')
  newPassword

  @rule('require', '头像不能为空')
  avatar

  @rule('isArray')
  @rule('optional')
  role = 3

  @rule('require', '权限组ID不能为空')
  @rule('isInt', '权限组ID必须为正整数', { min: 1 })
  roleId
}
