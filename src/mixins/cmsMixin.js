import config from 'config'
import MyForm from 'base/form/form'
import MyTable from 'base/table/table'

export const cmsMixin = {
  data () {
    return {
      // 所有页面类型
      allTypes: config.CMS,
      // 页面类型（首页、添加、编辑）
      type: config.CMS.INDEX,
      // 当前菜单对应的中文名
      name: '',
      // 是否在发送请求
      isPending: false
    }
  },
  async created () {
    this._initCMS()
  },
  // CMS初始化
  async mounted () {
    if (typeof this.pushBread === 'function') {
      this.pushBread('首页', `${this.name}列表`)
    }
  },
  methods: {
    // 配置Model
    setModel (model) {
      this.model = model
    },
    // 设置中文名称
    setName (name) {
      this.name = name
    },

    // 跳转到编辑页面
    toEdit (e) {
      this._changePageType(config.CMS.EDIT)
      this.formData = this.table[e.index]
    },

    // 跳转到首页
    toIndex () {
      this._changePageType(config.CMS.INDEX)
      this.formData = {}
    },

    /**
     * 改变页面状态（首页、添加、编辑）
     * @param type 页面类型（0 - 首页，1 - 添加，2 - 编辑）
     * @private
     */
    _changePageType (type) {
      this.type = type
      if (type === config.CMS.INDEX && this.bread.length > 2) this.popBread()
      else if (type === config.CMS.EDIT) this.pushBread('修改')
    },

    /**
     * 获取http请求结果之后，弹出dialog来显示信息
     * @param request http请求
     * @private
     */
    async _requestWithInfo (request) {
      // 已经有请求正在发送
      if (this.isPending) {
        return
      }
      this.isPending = true
      const res = await request()
      this.openDialog({
        title: '提示',
        content: res.message,
        cb: () => {
          this.isPending = false
          this.formData = {}
          this.toIndex()
          this._getData()
        },
        showCancel: false
      })
    },

    /**
     * 发送http请求前弹出询问dialog
     * 点击确定后进行_requestWithInfo操作
     * @param content dialog显示的内容
     * @param request http请求
     * @private
     */
    async _requestWithQuery ({ content, request }) {
      this.openDialog({
        title: '提示',
        content: content,
        cb: async () => {
          this._requestWithInfo(request)
        },
        showCancel: true
      })
    }
  },
  components: {
    MyForm,
    MyTable
  }
}
