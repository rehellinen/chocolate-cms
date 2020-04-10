<template lang="pug">
  div.progress-bar
    choc-search(
      v-if="searchConf.length > 0"
      :searchConf="searchConf"
      @search="toSearch"
      @clear="toClear"
    )

    el-table(
      v-loading="loading"
      :data="tableData"
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
        :fixed="item.fixed || false"
        :width="item.width || ''"
      )
        template(slot-scope="scope")
          p {{tableValue(item, scope)}}

      el-table-column(v-if="operate" label="自定义" fixed="right")
        template(slot-scope="scope")
          el-button(
            v-for="(item,index) in operate"
            :type="item.type"
            :key="index"
            size="mini"
            @click.native.prevent.stop="buttonMethods(item.func, scope.$index, scope.row)"
          ) {{item.name}}

      // 编辑与删除操作
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          el-button(
            v-if="!disableEdit"
            type="warning"
            size="mini"
            @click.native.prevent="toEdit(scope.$index)"
          ) 编辑
          el-button(
            size="mini"
            type="danger"
            v-if="!disableDelete"
            @click.native.prevent="toDelete(scope.$index)"
          ) 删除
    el-pagination(
      layout="prev, pager, next, jumper"
      :current-page="pageConf.page"
      :page-size="pageConf.pageSize"
      :total="data.length || null"
      @current-change="changePage"
      background
    )
</template>

<script>
import { dateFormat } from 'libs/utils/utils'

export default {
  name: 'ChocTable',
  props: {
    data: {
      // 表格数据
      type: Array,
      default: () => []
    },
    pageConf: {
      // 分页
      type: Object,
      default: () => ({
        pageSize: 5
      })
    },
    searchConf: {
      // 搜索
      type: Array,
      default: () => [{ label: '123' }]
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
    loading: {
      type: Boolean,
      default: true
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
      default: null
    }
  },
  data () {
    return {
      currentIndex: 1
    }
  },
  computed: {
    tableData () {
      let begin = (this.currentIndex - 1) * this.pageConf.pageSize
      let end = begin + this.pageConf.pageSize
      end = end > this.data.length ? this.data.length : end
      return this.data.slice(begin, end)
    }
  },
  methods: {
    // 调用自定义的函数
    buttonMethods (func, index, row) {
      if (typeof func === 'function') {
        func(index, row)
      }
    },
    toSearch (e) {
      this.$emit('search', e)
    },
    tableValue (data, scope) {
      let val = scope.row
      if (data.name.match('time')) {
        // 处理时间戳
        val = dateFormat(scope.row[data.name])
      } else if (data.name.includes('.')) {
        // 处理嵌套字段
        const fields = data.name.split('.')
        for (let field of fields) {
          val = val[field] || ''
        }
      } else {
        // 一般情况
        val = scope.row[data.name]
      }
      return (data.map && typeof data.map === 'function') ? data.map(val) : val
    },
    changePage (page) {
      this.currentIndex = page
    },
    toClear () {
      this.$emit('clear')
    },
    toEdit (index) {
      this.$emit('edit', { index })
    },
    toDelete (index) {
      this.$emit('delete', { index })
    }
  }
}
</script>

<style scoped lang="sass">
  .add-button
    margin-bottom: 10px
    background: linear-gradient(230deg, #0e4cfd, #6a8eff)
    border: none
    color: white
  .el-table__body
    .el-button
      margin: 2px 10px 2px 0
  .el-pagination
    margin-top: 10px
    /deep/ .active
      background: linear-gradient(230deg, #0e4cfd, #6a8eff)
      color: #fff
</style>
