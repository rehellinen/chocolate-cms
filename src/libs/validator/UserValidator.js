import { Validator, rule } from '../utils/validator'

export class UserValidator extends Validator {
  scene = {
    // TODO: 还差order和role未检验
    get: ['id', 'account', 'name', 'avatar', 'role', 'roleId'],
    add: ['account', 'name', 'password', 'avatar', 'roleId']
  }

  @rule('require', 'id不能为空')
  id

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

  @rule('isObject')
  @rule('optional')
  role

  @rule('isInt', '分组id必须为正整数', { min: 1 })
  @rule('require', '分组不能为空')
  roleId

  constructor (data, options = {}) {
    super(data, options)
    this.check()
  }
}
