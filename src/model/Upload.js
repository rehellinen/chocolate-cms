import { get } from 'libs/utils/http'

export class Upload {
  // TODO: MOCK
  static getMock () {
    return get('mock/upload.json')
  }
}
