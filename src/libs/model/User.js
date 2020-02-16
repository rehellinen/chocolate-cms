import { get, post } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'
import { saveTokens } from 'libs/utils/token'

export class User extends BaseModel {
  id

  name

  account

  password

  avatar

  groupId

  status

  order


  constructor (data) {
    super()
    this.setData(data, [
      'id',
      'name',
      'account',
      'password',
      'avatar',
      'groupId',
      'status',
      'order'
    ])
  }

  /**
   * 登录
   * @param account 账号
   * @param password 密码
   */
  static async getToken (account, password) {
    const data = {
      account,
      password
    }
    const res = await post('/user/login', data)
    saveTokens(res.accessToken, res.refreshToken)
    return res
  }

  /**
   * 获取已登录的账户信息
   */
  static async getUser () {
    const user = await get('user/self')
    return new User(user)
  }
}
