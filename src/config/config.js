/**
 *  config.js
 *  Create By rehellinen
 *  Create On 2019/3/4 11:35
 */
export default {
  REST_URL: PRODUCTION
    ? 'http://127.0.0.1:9527'
    : 'http://127.0.0.1:9527',
  // 需要导入的路由配置文件名称（放置目录为src/config/router）
  ROUTER_CONF_FILES: ['framework', 'custom'],
  CMS: {
    INDEX: Symbol('index'),
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
