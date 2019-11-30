import { BaseModel } from './BaseModel'

export class Upload extends BaseModel {
  constructor () {
    super('upload')
  }

  // TODO: MOCK
  getMock () {
    return this.request({
      url: 'mock/upload.json'
    })
  }
}
