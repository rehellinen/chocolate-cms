/**
 *  Menu.js
 *  Create By rehellinen
 *  Create On 2019/3/4 11:34
 */
import { BaseModel } from './BaseModel'

export class Article extends BaseModel {
  constructor () {
    super('article')
  }

  // TODO: MOCK
  getMock () {
    return this.request({
      url: 'mock/article.json'
    })
  }
}
