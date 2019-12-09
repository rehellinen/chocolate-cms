import { get } from 'libs/utils/http'

export class Home {
  // TODO: MOCK
  static getMock () {
    return get('mock/home.json')
  }
}
