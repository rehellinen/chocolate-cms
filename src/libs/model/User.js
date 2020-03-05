import { get, post, del, put, uploadFile } from 'libs/utils/http'
import { saveTokens } from 'libs/utils/token'
import { UserValidator } from 'libs/validator/UserValidator'

export class User {
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
    return new UserValidator(user, { scene: 'get' })
  }

  /**
   * 修改当前用户密码
   */
  static async changePw (oldPw, newPw) {
    return put('user/self/pwd', { oldPassword: oldPw, newPassword: newPw }, { getAllResponse: true })
  }

  /**
   * 修改当前用户头像
   */
  static async editPortrait (file) {
    const { path } = await uploadFile({ file: file })
    return put('user/self/avatar', { avatar: path }).then(res => {
      return path
    })
  }

  /**
   * admin 获取所有用户信息
   */
  static async getAllUser () {
    const res = await get('user')
    res.data = res.data.map(item => new UserValidator(item, { scene: 'get' }))
    return res
  }

  /**
   * admin 修改某个用户的密码
   */
  static changeUserPw (id, newPw) {
    return put('user/' + id + '/password', { password: newPw }, { getAllResponse: true })
  }

  /**
   * admin 修改某个用户的信息
   */
  static changeUserInfo (e) {
    const user = new UserValidator(e, { scene: 'get' })
    return put('user/' + user.id, user)
  }

  /**
   * admin 增加一个用户
   */
  static addUser (e) {
    const user = new UserValidator(e, { scene: 'add' })
    return post('user', user)
  }

  /**
   * admin 删除某个用户
   */
  static deleteData (userId) {
    return del('user/' + userId, '', { getAllResponse: true })
  }
}
