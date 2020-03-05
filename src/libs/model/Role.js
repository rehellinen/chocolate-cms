import { del, get, put, post } from 'libs/utils/http'
import { RoleValidator } from 'libs/validator/RoleValidator'

export class Role {
  /**
   * admin 获取所有角色
   */
  static async getAllRole () {
    return get('role')
  }

  /**
   * 获取某个角色拥有的权限
   */
  static async getRoleAuth (roleId) {
    return get('/role/' + roleId + '/auth')
  }

  /**
   * 修改某个角色拥有的权限
   */
  static async editRoleAuth (roleId, auth) {
    return post('/role/' + roleId + '/auth', { authIds: auth })
  }

  /**
   * admin 修改某个角色的信息
   */
  static changeRoleInfo (e) {
    const role = new RoleValidator(e, { scene: 'edit' })
    return put('role/' + e.id, role)
  }

  /**
   * admin 增加一个角色
   */
  static addRole (e) {
    const role = new RoleValidator(e, { scene: 'edit' })
    return post('role', role)
  }

  /**
   * admin 删除某个角色
   */
  static deleteData (roleId) {
    return del('role/' + roleId, '', { getAllResponse: true })
  }
}
