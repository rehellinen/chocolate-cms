import { get, post, del, put, uploadFile } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'
import { saveTokens } from 'libs/utils/token'

export class User extends BaseModel {
  id

  name

  account

  password

  avatar

  roleId

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
      'roleId',
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
  static getAllUser () {
    return get('user')
  }

  /**
   * admin 获取所有角色
   */
  static async getAllAuth () {
    const res = await get('role')
    let options = []
    for (let item of res.data) {
      options.push({
        label: item.name,
        value: item.id
      })
    }
    return options
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
    const user = new User(e)
    return put('user/' + e.id, user)
  }

  /**
   * admin 增加一个用户
   */
  // TODO: 验证器验证参数
  static addUserInfo (e) {
    const user = new User(e)
    return post('user', user)
  }

  /**
   * admin 删除某个用户
   */
  static deleteData (useId) {
    return del('user/' + useId, '', { getAllResponse: true })
  }
}
