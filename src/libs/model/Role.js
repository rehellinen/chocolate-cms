import { del, get } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'

export class Role extends BaseModel {
  id

  name

  desc

  constructor (data) {
    super()
    this.setData(data, [
      'id',
      'name',
      'desc'
    ])
  }

  /**
   * admin 获取所有角色
   */
  static async getAllRole () {
    return get('role')
  }

  /**
   * admin 删除某个角色
   */
  static deleteData (roleId) {
    return del('role/' + roleId, '', { getAllResponse: true })
  }
}
