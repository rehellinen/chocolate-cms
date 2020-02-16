import { get, post } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'

export class Auth extends BaseModel {
  id

  name

  bundle

  groupId

  constructor (data) {
    super()
    this.setData(data, [
      'id',
      'name',
      'bundle',
      'groupId'
    ])
  }

  /**
   * 获取当前用户拥有的权限
   */
  static async getUserAuth () {
    const auth = await get('/auth/self')
    return new Auth(auth)
  }

  /**
   * 添加一条权限
   * @param form 表单数据
   */
  static async addAuth (form) {
    const auth = new Auth(form)
    return post('auth', auth)
  }
}
