import config from '../utils/config'
import MyForm from '../base/form/form'
import MyTable from '../base/table/table'
import MyBread from '../base/bread-crumb/bread-crumb'
import { Token } from '../utils/Token'

export const cmsMixin = {
  data () {
    return {
      // 表格展示的数据
      data: [],
      // 所有页面类型
      allTypes: config.CMS,
      // 页面类型（首页、添加、编辑）
      type: config.CMS.INDEX,
      // 表单的配置
      form: [],
      // 表格的配置
      table: [],
      // 搜索的配置
      search: [],
      // 面包屑导航栏
      bread: ['首页'],
      // 编辑页面展示的数据
      formData: {},
      // 模型
      model: null,
      // 当前菜单对应的中文名
      name: '',
      // 是否在发送请求
      isPending: false
    }
  },
  async created () {
    await this.checkLogin()
  },
  // CMS初始化
  async mounted () {
    this._initCMS()
    await this._getData()
    this._pushBread(`${this.name}管理`)
  },
  methods: {
    // 新组件需覆盖的方法
    _initCMS () {},

    // 获取表格数据
    async _getData () {
      this.data = []
      const res = await this.model.getAll()
      if (res.isError) {
        this.data = []
        return
      }
      this.data = res.data
      this.setPageConf(res.page)
    },

    // 检查是否登录
    async checkLogin () {
      const isLogin = await new Token().isLogin()
      if (!isLogin) {
        this.openDialog({
          title: '错误提示',
          content: '登录已失效',
          cb: () => this.$router.push('/login'),
          showCancel: false
        })
      } else {
        const type = new Token().getTypeFromCache()
        if (type === config.ADMIN_TYPE.TEACHER) {
          if (!config.TEACHER_PAGE.includes(this.$route.path)) {
            this.$router.push(config.TEACHER_PAGE[0])
          }
        } else {
          if (this.$route.path === '/login') this.$router.push('/')
        }
      }
    },

    // 配置添加、编辑页面的表单元素
    setForm (conf) {
      this.form = conf
    },

    // 配置表格
    setTable (conf) {
      this.table = conf
    },

    // 配置搜索
    setSearch (conf) {
      this.search = conf
    },

    // 配置Model
    setModel (model) {
      this.model = model
    },

    // 设置中文名称
    setName (name) {
      this.name = name
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

    // 跳转到首页
    toIndex () {
      this._changePageType(config.CMS.INDEX)
      this.formData = {}
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
        this.data = []
        return
      }
      this.data = searchRes.data
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
        async () => await this.model.addData(data)
      )
    },

    editData (data) {
      this._requestWithInfo(
        async () => await this.model.editData(data)
      )
    },

    deleteData ({ index }) {
      const id = this.data[index].id
      this._requestWithQuery({
        content: '是否确定删除',
        request: async () => await this.model.deleteData(id)
      })
    },

    /**
     * 发送HTTP改变状态
     * @param e 事件对象
     * @returns {Promise<void>}
     */
    async changeStatus (e) {
      const reqData = this.data[e.index]
      const status = reqData.status === config.STATUS.NORMAL
        ? config.STATUS.ABNORMAL : config.STATUS.NORMAL
      this._requestWithQuery({
        content: '是否确定更改状态',
        request: async () => await this.model.changeStatus(reqData.id, status)
      })
    },

    /**
     * 发送HTTP改变排序
     * @param e 事件对象
     * @returns {Promise<void>}
     */
    async changeOrder (e) {
      const reqData = this.data[e.index]
      this._requestWithQuery({
        content: '是否确定更改排序',
        request: async () => await this.model.changeOrder(reqData.id, e.order)
      })
    },

    /**
     * 改变页面状态（首页、添加、编辑）
     * @param type 页面类型（0 - 首页，1 - 添加，2 - 编辑）
     * @private
     */
    _changePageType (type) {
      this.type = type
      if (type === config.CMS.INDEX && this.bread.length > 2) this._popBread()
      else if (type === config.CMS.ADD) this._pushBread('添加')
      else if (type === config.CMS.EDIT) this._pushBread('修改')
    },

    // 往面包屑导航栏添加元素
    _pushBread (name) {
      this.bread.push(name)
    },

    // 删除面包屑导航栏的最后一个元素
    _popBread () {
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
      this.openDialog({
        title: '提示',
        content: res.message,
        cb: () => {
          this.isPending = false
          if (res.isExpired) {
            const type = new Token().getTypeFromCache()
            if (type === config.ADMIN_TYPE.TEACHER && new Token().isLogin()) {
              return
            }
            this.$router.push('/login')
          }
          if (res.isError) {
            return
          }
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
    MyTable,
    MyBread
  }
}
