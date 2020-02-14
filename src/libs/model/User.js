import { get, post } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'
import { saveTokens } from 'libs/utils/token'

export class User extends BaseModel {
  // TODO: MOCK
  static getMock () {
    return get('user/all')
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
    const res = await post('/user/login', data, {
      getAllResponse: true
    })
    console.log(res.data.accessToken)
    saveTokens(res.data.accessToken, res.data.refreshToken)
    return res
  }
}
