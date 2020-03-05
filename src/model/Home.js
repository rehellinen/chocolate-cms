import { get } from 'libs/utils/http'

export class Home {
  // TODO: MOCK
  static getCount () {
    return get('mock/count')
  }

  static getProgress () {
    return get('mock/progress')
  }
}
