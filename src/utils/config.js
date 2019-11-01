/**
 *  config.js
 *  Create By rehellinen
 *  Create On 2019/3/4 11:35
 */
export default {
  restUrl: PRODUCTION
    ? 'http://127.0.0.1:9527'
    : 'http://127.0.0.1:9527',
  STATUS: {
    NORMAL: 1,
    DELETED: -1,
    ABNORMAL: 0
  },
  CMS: {
    INDEX: Symbol('index'),
    ADD: Symbol('add'),
    EDIT: Symbol('edit')
  },
  FORM: {
    INPUT: Symbol('input'),
    SELECT: Symbol('select'),
    EDITOR: Symbol('editor'),
    FILE: Symbol('file'),
    DISABLED: Symbol('disabled'),
    DATE: Symbol('date')
  }
}
