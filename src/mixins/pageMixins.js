export const pageMixin = {
  data () {
    return {
      pageConf: {}
    }
  },
  methods: {
    async changePage ({ page }) {
      const res = await this.model.getAll({ page })
      this.data = res.data
      this.setPageConf(res.page)
    },
    setPageConf (conf) {
      this.pageConf = {
        page: conf.page,
        pageSize: conf.pageSize,
        totalPage: conf.pageCount,
        totalItem: conf.rowCount
      }
    }
  }
}
