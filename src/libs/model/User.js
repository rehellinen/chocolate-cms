import { put } from 'libs/utils/http'

export class User {
  // 更改用户名
  static editName () {
    return put('user/name')
  }

  // 更改用户头像
  static editPortrait () {
    return put('user/portrait')
  }
}
