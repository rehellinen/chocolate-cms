import ChocDialog from 'base/dialog/dialog'

export const install = (Vue, opts = {}) => {
  const DialogConstructor = Vue.extend(ChocDialog)
  let instance = new DialogConstructor()

  Vue.prototype.$dialog = (opts) => {
    let myInstance = instance
    if (!myInstance._isMounted) {
      myInstance.$mount(document.createElement('div'))
    }
    myInstance.visible = true
    myInstance.title = opts.title || ''
    myInstance.content = opts.content || ''
    myInstance.button = opts.button || '确定'
    myInstance.showCancel = opts.showCancel
    myInstance.cb = opts.cb
    document.body.appendChild(myInstance.$el)
    myInstance.$on('update:visible', function () {
      myInstance.visible = false
    })
  }
}

export default install
