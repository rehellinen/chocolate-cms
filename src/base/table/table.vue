<template lang="pug">
  div
    el-button.add-button(
      v-if="!disableAdd"
      size="small"
      @click="toAdd"
    ) 添加

    my-search(
      v-if="searchConf.length > 0"
      :searchConf="searchConf"
      @search="toSearch"
      @clear="toClear"
    )

    el-table(
      :data="data"
      :border="border"
      style="width: 100%"
      :height="height"
    )
      // 多选
      el-table-column(v-if="type" :type="type" width="55")
      // 索引
      el-table-column(
        v-if="index"
        type="index"
        :index="currentIndex"
        width="55")
      // 内容
      el-table-column(
        v-for="(item, index) in tableColumn"
        :label="item.label"
        :key="index"
        :fixed="item.fixed ? item.fixed : false"
        :width="item.width ? item.width : ''"
      )
        template(slot-scope="scope")
          p {{tableValue(item, scope)}}
      // 排序
      <!--el-table-column(prop="listorder" label="排序" width="70")-->
        <!--template(slot-scope="scope")-->
          <!--el-input(-->
            <!--:placeholder="scope.row.order"-->
            <!--v-model="listorder[scope.$index]"-->
            <!--@blur="changeOrder(scope.$index)"-->
          <!--)-->
      // 状态
      el-table-column(prop="status" label="状态" width="90")
        template(slot-scope="scope")
          el-button(
            size="mini"
            @click.native.prevent="changeStatus(scope.$index)"
          ) {{statusCN(scope.row.status)}}

      // 编辑与删除操作
      el-table-column(label="操作" fixed="right" :width="disableEdit ? 75 : 145")
        template(slot-scope="scope")
          el-button(
            v-if="!disableEdit"
            size="mini"
            @click.native.prevent="toEdit(scope.$index)"
          ) 编辑
          el-button(
            type="danger" size="mini"
            v-if="!disableDelete"
            @click.native.prevent="toDelete(scope.$index)"
          ) 删除
          el-button(
            v-for="(item,index) in operate"
            :type="item.type"
            plain
            :key="index"
            size="mini"
            v-auth="{auth:item.auth ? item.auth : '', type: 'disabled'}"
            @click.native.prevent.stop="buttonMethods(item.func, scope.$index, scope.row)"
            ) {{item.name}}
    el-pagination(
      layout="prev, pager, next, jumper"
      :current-page="pageConf.page"
      :page-size="pageConf.pageSize"
      :total="pageConf.totalItem"
      @current-change="changePage"
      background
    )
</template>

<script>
import config from '../../utils/config'
import MySearch from '../../base/search/search'

export default {
  components: {
    MySearch
  },
  props: {
    data: {
      // 表格数据
      type: Array,
      default: () => []
    },
    pageConf: {
      // 分页
      type: Object,
      default: () => ({})
    },
    searchConf: {
      // 搜索
      type: Array,
      default: () => [{
        label: '123' }]
    },
    statusConf: {
      type: Array,
      default: () => []
    },
    disableAdd: {
      type: Boolean,
      default: false
    },
    disableEdit: {
      type: Boolean,
      default: false
    },
    disableDelete: {
      type: Boolean,
      default: false
    },
    type: {
      // 多选
      type: String,
      default: null
    },
    index: {
      // 索引
      type: String,
      default: ''
    },
    tableColumn: {
      // 表头
      type: Array,
      default: () => []
    },
    border: {
      // 边框
      type: Boolean,
      default: false
    },
    height: {
      // 表的高度
      type: Number,
      default: null
    },
    operate: {
      // 自定义按键及绑定方法
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      listorder: [],
      currentIndex: 1,
      column: []
    }
  },
  methods: {
    // 开发者自定义的函数
    buttonMethods (func, index, row) {
      const _this = this
      const { methods } = this.$options
      methods[func](_this, index, row)
    },
    toSearch (e) {
      this.$emit('search', e)
    },
    tableValue (data, scope) {
      let val = scope.row
      if (data.name.match('time')) {
        // 处理时间戳
        val = this.timestampToDate(scope.row[data.name])
      } else if (data.name.includes('.')) {
        // 处理嵌套字段
        const fields = data.name.split('.')
        for (let field of fields) {
          val = val[field]
        }
      } else {
        // 一般情况
        val = scope.row[data.name]
      }
      return (data.map && typeof data.map === 'function') ? data.map(val) : val
    },
    timestampToDate (timestamp) {
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()

      return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    },
    changePage (page) {
      this.$emit('changePage', { page })
    },
    toClear () {
      this.$emit('clear')
    },
    toAdd () {
      this.$emit('add')
    },
    toEditSection (index) {
      this.$emit('editSection', { index })
    },
    toEdit (index) {
      this.$emit('edit', { index })
    },
    toDelete (index) {
      this.$emit('delete', { index })
    },
    changeStatus (index) {
      this.$emit('status', { index })
    },
    changeOrder (index) {
      if (!this.listorder[index]) return
      this.$emit('order', {
        index,
        order: this.listorder[index]
      })
      this.listorder = []
    },
    statusCN (status) {
      if (this.statusConf.length > 0) {
        if (status === config.STATUS.NORMAL) return this.statusConf[0]
        else return this.statusConf[1]
      }
      if (status === config.STATUS.NORMAL) return '正常'
      else return '错误'
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .add-button
    margin-bottom: 10px
  .el-pagination
    margin-top: 10px
</style>
