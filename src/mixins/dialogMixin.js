/**
 *  mixins.js
 *  Create By rehellinen
 *  Create On 2019/3/5 15:34
 */
import MyDialog from '../base/dialog/dialog'

export const dialogMixin = {
  data () {
    return {
      visible: false,
      title: '',
      content: '',
      cancel: false,
      cb: () => {}
    }
  },
  methods: {
    openDialog ({ title, content, cb, showCancel = !!cb }) {
      showCancel ? this.showCancel() : this.hideCancel()
      this.visible = true
      this.title = title
      this.content = content
      this.cb = cb
    },
    showCancel () {
      this.cancel = true
    },
    hideCancel () {
      this.cancel = false
    },
    toCancel () {
      this.closeDialog()
    },
    toConfirm () {
      this.closeDialog()
    },
    closeDialog () {
      this.visible = false
    }
  },
  components: {
    MyDialog
  }
}

