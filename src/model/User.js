import { BaseModel } from 'model/BaseModel'

export class User extends BaseModel {
  // 更改用户名
  editName () {
    return this.request()
  }

  // 更改用户头像
  editPortrait () {
    return this.request()
  }
}
