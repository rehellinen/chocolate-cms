import { del, get, post, put } from 'libs/utils/http'
import { AuthValidator } from 'libs/validator/AuthValidator'

export class Auth {
  /**
   * 获取当前用户拥有的权限
   */
  static async getUserAuth () {
    const auth = await get('/auth/self', { scene: 'get' })
    return new AuthValidator(auth)
  }

  /**
   * 获取所有权限
   */
  static async getAllAuth () {
    const auth = await get('/auth')
    return auth.data
  }

  /**
   * 修改权限
   * @param form 表单数据
   */
  static async changeAuth (form) {
    const auth = new AuthValidator(form, { scene: 'edit' })
    return put('auth/' + form.id, auth)
  }

  /**
   * 添加一条权限
   * @param form 表单数据
   */
  static async addAuth (form) {
    const auth = new AuthValidator(form, { scene: 'edit' })
    return post('auth', auth)
  }

  /**
   * admin 删除某个权限
   */
  static deleteData (authId) {
    return del('auth/' + authId, '', { getAllResponse: true })
  }
}
