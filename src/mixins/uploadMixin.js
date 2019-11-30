export const uploadMixin = {
  data () {
    return {
      // 展示的数据
      data: [],
      // 模型
      model: null
    }
  },
  async created () {
    // await this.checkLogin()
  },
  // CMS初始化
  async mounted () {
    this._initCMS()
    await this._getData()
  },
  methods: {
    // 新组件需覆盖的方法
    _initCMS () {},

    // 获取数据
    async _getData () {
      this.data = []
      // TODO: 此处使用了MOCK
      const res = await this.model.getMock()
      if (res.isError) {
        this.data = []
        return
      }
      this.data = res.data
    },

    // 配置Model
    setModel (model) {
      this.model = model
    }
  }
}
