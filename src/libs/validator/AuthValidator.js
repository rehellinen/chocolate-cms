import { Validator, rule } from 'libs/utils'

export class AuthValidator extends Validator {
  scene = {
    get: ['id', 'name', 'desc'],
    edit: ['name', 'desc']
  }

  @rule('require', 'id不能为空')
  id

  @rule('require', '名称不能为空')
  name

  @rule('require', '描述不能为空')
  desc

  constructor (data, options = {}) {
    super(data, options)
    this.check()
  }
}
