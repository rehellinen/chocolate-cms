import { get } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'

export class Authority extends BaseModel {
  // TODO: MOCK
  static getMock () {
    return get('mock/authority.json')
  }
}
