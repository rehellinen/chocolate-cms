/**
 *  config.js
 *  Create By rehellinen
 *  Create On 2019/3/4 11:35
 */
export default {
  restUrl: PRODUCTION
    ? 'http://test.com'
    : 'http://test.com',
  CMS: {
    INDEX: 1,
    ADD: 2,
    EDIT: 3
  },
  STATUS: {
    NORMAL: 1,
    DELETED: -1,
    ABNORMAL: 0
  },
  FORM: {
    INPUT: 1,
    SELECT: 2,
    EDITOR: 3,
    FILE: 4,
    DISABLED: 5,
    DATE: 6
  }
}
