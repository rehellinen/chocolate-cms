import { get } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'

export class User extends BaseModel {
  // TODO: MOCK
  static getMock () {
    return get('mock/user.json')
  }
}
