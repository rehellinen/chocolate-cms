module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-debugger': 'off',
    'generator-star-spacing': 'off',
    'no-multiple-empty-lines': [2, {
      max: 2
    }]
  },
  globals: {
    PRODUCTION: false
  }
}
