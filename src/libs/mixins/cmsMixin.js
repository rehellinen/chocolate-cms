import config from 'config'

export const cmsMixin = {
  data () {
    return {
      // 所有页面类型
      allTypes: config.CMS,
      // 页面类型（首页、添加、编辑）
      type: config.CMS.INDEX,
      // 当前菜单对应的中文名
      name: '',
      // 面包屑导航栏数据
      bread: [],
      // 表单的配置
      form: [],
      formData: {},
      // 展示的数据
      table: [],
      // 表格的配置
      tableColumn: [],
      // 表格的自定义操作
      operate: [],
      // 搜索的配置
      search: [],
      loading: true,
      // 是否在发送请求
      isPending: false,
      pageConf: {
        pageSize: 5
      }
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

    // 配置添加、编辑页面的表单元素
    setForm (conf) {
      this.form = conf
    },

    /**
     * 处理添加、编辑页面中按钮点击后的事件
     * @param e 按钮点击事件的参数
     */
    toSubmit (e) {
      if (this.type === config.CMS.EDIT) {
        this.editData(e)
      } else {
        this.addData(e)
      }
    },

    addData (data) {
      this._requestWithInfo(
        async () => this.model.addData(data)
      )
    },

    editData (data) {
      this._requestWithInfo(
        async () => this.model.editData(data)
      )
    },

    // 获取表格数据，用户需覆盖此方法以获取数据
    async getTable () {
      this.table = []
      // TODO: 此处使用了MOCK
      const res = await this.model.getMock()
      if (res.isError) {
        this.table = []
        return
      }
      this.table = res
      this.loading = false
    },

    // 配置表格
    setTable (conf) {
      this.tableColumn = conf
      this.getTable()
    },

    setPage (conf) {
      this.pageConf = {
        page: conf.page,
        pageSize: conf.pageSize,
        total: conf.total
      }
    },

    // 配置表单自定义按钮
    setOperate (conf) {
      this.operate = conf
    },

    // 配置搜索
    setSearch (conf) {
      this.search = conf
    },

    // 清除搜索结果
    toClear () {
      this.toIndex()
      this.getData()
    },

    // 处理搜索事件
    async toSearch (e) {
      if (!e.field) {
        this.openDialog({ content: '字段不能为空' })
        return
      }

      if (!e.searchStr) {
        this.openDialog({ content: '搜索关键字不能为空' })
        return
      }

      const searchRes = await this.model.search(e)
      if (searchRes.isError) {
        this.table = []
        return
      }
      this.table = searchRes.data
    },

    // 跳转到编辑页面
    toEdit (e) {
      this._initCMS()
      this._changePageType(config.CMS.EDIT)
      this.formData = {
        ...this.table[e.index]
      }
    },

    deleteData ({ index }) {
      const id = this.table[index].id
      this._requestWithQuery({
        content: '是否确定删除',
        request: async () => this.model.deleteData(id)
      })
    },

    // 往面包屑导航栏添加元素
    pushBread (...names) {
      this.bread.push(...names)
    },

    // 删除面包屑导航栏的最后一个元素
    popBread () {
      this.bread.pop()
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
      this.$dialog({
        title: '提示',
        content: res.message,
        cb: () => {
          this.isPending = false
          this.formData = {}
          this.toIndex()
          this.getTable()
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
      this.$dialog({
        title: '提示',
        content: content,
        cb: async () => {
          this._requestWithInfo(request)
        },
        showCancel: true
      })
    }
  }
}
