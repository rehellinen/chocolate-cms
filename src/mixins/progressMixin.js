export const progressMixin = {
  data () {
    return {
      // 展示的数据
      data: [],
      // 进度条的数据
      progress: [],
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
      if (res.page) {
        this.setPageConf(res.page)
      }
      if (res.progress) {
        this.setProgress(res.progress)
      }
    },

    // 配置进度条
    setProgress (conf) {
      this.progress = conf
    },

    // 配置Model
    setModel (model) {
      this.model = model
    }
  }
}
