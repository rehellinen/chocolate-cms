import { get, put, post, del } from 'libs/utils/http'

export class Article {
  static getArticle () {
    return get('article')
  }

  static editArticle (e) {
    return put('article/' + e.id, e)
  }

  static addArticle (e) {
    return post('article', e)
  }

  static deleteData (id) {
    return del('article/' + id, {}, { getAllResponse: true })
  }
}
