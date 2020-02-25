import config from 'config'

export const formMixin = {
  data () {
    return {
      // 表单的配置
      form: [],
      formData: []
    }
  },
  methods: {
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
    }
  }
}
