import { BaseModel } from './BaseModel'

export class Home extends BaseModel {
  constructor () {
    super('home')
  }

  // TODO: MOCK
  getMock () {
    return this.request({
      url: 'mock/home.json'
    })
  }
}
