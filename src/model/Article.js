import { get } from 'libs/utils/http'

export class Article {
  // TODO: MOCK
  static getMock () {
    return get('mock/article.json')
  }
}
