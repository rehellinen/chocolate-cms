import MyBread from 'base/bread-crumb/bread-crumb'

export const breadMixin = {
  data () {
    return {
      // 面包屑导航栏数据
      bread: []
    }
  },
  methods: {
    // 往面包屑导航栏添加元素
    pushBread (...names) {
      this.bread.push(...names)
    },

    // 删除面包屑导航栏的最后一个元素
    popBread () {
      this.bread.pop()
    }
  },
  components: {
    MyBread
  }
}
