import config from 'config/index'

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
      loading: true,
      // 是否在发送请求
      isPending: false,
      pageConf: {
        pageSize: 5
      }
    }
  },
  mounted () {
    this.getTable()
  },
  methods: {
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
      this._getData()
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
      this.formData = this.table[e.index]
    },

    deleteData ({ index }) {
      const id = this.table[index].id
      this._requestWithQuery({
        content: '是否确定删除',
        request: async () => this.model.deleteData(id)
      })
    }
  }
}
