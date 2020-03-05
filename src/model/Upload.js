import { get } from 'libs/utils/http'

export class Upload {
  static getImage () {
    return get('mock/image')
  }
}
