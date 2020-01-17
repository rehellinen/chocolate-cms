import { get } from 'libs/utils/http'
import { BaseModel } from 'libs/model/BaseModel'

export class Article extends BaseModel {
  // TODO: MOCK
  static getMock () {
    return get('mock/article.json')
  }
}
