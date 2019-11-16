import config from '../utils/config'

export const tableMixin = {
  data () {
    return {
      // 展示的数据
      table: [],
      // 表格的配置
      tableColumn: [],
      // 表格的自定义操作
      operate: [],
      // 搜索的配置
      search: [],
      // 模型
      model: null,
      // 是否在发送请求
      isPending: false
    }
  },
  async created () {
    // await this.checkLogin()
  },
  // CMS初始化
  async mounted () {
    await this._getData()
  },
  methods: {
    // 获取数据
    async _getData () {
      this.table = []
      // TODO: 此处使用了MOCK
      const res = await this.model.getMock()
      if (res.isError) {
        this.table = []
        return
      }
      this.table = res.data
      this.setPageConf(res.page)
    },

    // 配置表格
    setTable (conf) {
      this.tableColumn = conf
    },

    // 配置表单自定义按钮
    setOperate (conf) {
      this.operate = conf
    },

    // 配置搜索
    setSearch (conf) {
      this.search = conf
    },

    // 配置Model
    setTableModel (model) {
      this.model = model
    },

    // 跳转到添加页面
    toAdd (e) {
      this._changePageType(config.CMS.ADD)
    },

    // 跳转到编辑页面
    toEdit (e) {
      this._changePageType(config.CMS.EDIT)
    },

    // 清除搜索结果
    toClear () {
      this.toIndex()
      this._getData()
    },

    // 处理搜索事件
    async toSearch (e) {
      if (!e.field) {
        this.openDialog({
          content: '字段不能为空'
        })
        return
      }

      if (!e.searchStr) {
        this.openDialog({
          content: '搜索关键字不能为空'
        })
        return
      }

      const searchRes = await this.model.search(e)
      if (searchRes.isError) {
        this.table = []
        return
      }
      this.table = searchRes.data
      this.setPageConf(searchRes.page)
    },

    /**
     * 处理添加、编辑页面中按钮点击后的事件
     * @param e 按钮点击事件的参数
     */
    toSubmit (e) {
      if (this.type === config.CMS.ADD) {
        this.addData(e)
      } else if (this.type === config.CMS.EDIT) {
        this.editData(e)
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

    deleteData ({ index }) {
      const id = this.data[index].id
      this._requestWithQuery({
        content: '是否确定删除',
        request: async () => this.model.deleteData(id)
      })
    }
  }
}
