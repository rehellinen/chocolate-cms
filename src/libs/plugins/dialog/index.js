import Vue from 'vue'
import ChocDialog from 'base/dialog/dialog'

export const Dialog = (opts = {}) => {
  const DialogConstructor = Vue.extend(ChocDialog)
  let instance = null
  // eslint-disable-next-line func-names
  DialogConstructor.prototype.close = () => {
    this.visible = false
  }

  const getInstance = () => {
    if (!instance) {
      instance = new DialogConstructor()
    }
    return instance
  }

  const elem = document.createElement('div')
  if (!instance) {
    let myInstance = getInstance()
    Vue.prototype.$DialogConstructor = myInstance
    myInstance.$mount(elem)
    myInstance.title = opts.title || ''
    myInstance.content = opts.content || ''
    myInstance.button = opts.button || '确定'
    myInstance.showCancel = opts.showCancel || true
    myInstance.cb = opts.cb
    document.body.appendChild(myInstance.$el)
    myInstance.$on('close', () => {
      myInstance.close()
      document.body.removeChild(myInstance.$el)
      myInstance.$destroy()
      myInstance = null
      instance = null
    })
  }
}

const install = (Vue, options = {}) => {
  Vue.prototype.$dialog = Dialog
}

export default install
