export const progressMixin = {
  data () {
    return {
      // 进度条的数据
      progress: []
    }
  },
  async mounted () {
    await this.getProgress()
  },
  methods: {
    // 获取进度条数据
    async getProgress () {
      this.data = []
      // TODO: 此处使用了MOCK
      const res = await this.model.getMock()
      if (res.isError) {
        this.data = []
        return
      }
      this.data = res.data
      if (res.progress) {
        this.setProgress(res.progress)
      }
    },

    // 配置进度条
    setProgress (conf) {
      this.progress = conf
    }
  }
}
