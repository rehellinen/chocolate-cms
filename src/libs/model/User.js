import { get, post, del, put, uploadFile } from 'libs/utils/http'
import { BaseModel, rule } from 'libs/model/BaseModel'
import { saveTokens } from 'libs/utils/token'

export class User extends BaseModel {
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

  @rule('require', '权限信息不能为空')
  role

  @rule('require', '权限组ID不能为空')
  @rule('isInt', '权限组ID必须为正整数', { min: 1 })
  roleId


  constructor (data, options) {
    super(data, options)
    this.init()
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
    return new User(user, { scene: 'get' })
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
    res.data = res.data.map(item => new User(item, { scene: 'get' }))
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
