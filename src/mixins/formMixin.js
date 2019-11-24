import config from 'config/config'

export const formMixin = {
  data () {
    return {
      // 表单的配置
      form: [],
      // 搜索的配置
      search: [],
      // 编辑页面展示的数据
      formData: {},
      // 模型
      model: null
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
    // 配置添加、编辑页面的表单元素
    setForm (conf) {
      this.form = conf
    },

    // 配置搜索
    setSearch (conf) {
      this.search = conf
    },

    // 跳转到添加页面
    toAdd (e) {
      this._changePageType(config.CMS.ADD)
    },

    // 跳转到编辑页面
    toEdit (e) {
      this._changePageType(config.CMS.EDIT)
      this.formData = this.data[e.index]
    },

    // 清除搜索结果
    toClear () {
      this.formData = {}
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
        this.form = []
        return
      }
      this.form = searchRes.data
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
