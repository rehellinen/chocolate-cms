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
      border
      style="width: 100%"
    )
      // id
      el-table-column(prop="id" label="ID" fixed width="50")
      // 其他属性
      el-table-column(
        v-for="(conf, index) in config"
        :label="conf.label"
        :key="index"
        :width="conf.name === 'redirect' ? 75 : ''"
      )
        template(slot-scope="scope")
          el-button(
            size="mini"
            v-if="conf.name === 'redirect'"
            @click.native.prevent="toEditSection(scope.$index)"
          ) 编辑
          a(
            v-if="conf.name === 'file'"
            :href="tableValue(conf, scope)"
            target="_blank"
          ) {{tableValue(conf, scope)}}
          p(v-else) {{tableValue(conf, scope)}}

      // 排序
      el-table-column(prop="listorder" label="排序" width="70")
        template(slot-scope="scope")
          el-input(
            :placeholder="scope.row.order"
            v-model="listorder[scope.$index]"
            @blur="changeOrder(scope.$index)"
          )
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
            @click.native.prevent="toDelete(scope.$index)"
          ) 删除
    el-pagination(
      layout="prev, pager, next, jumper"
      :current-page="pageConf.page"
      :page-size="pageConf.pageSize"
      :page-count="pageConf.totalPage"
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
      type: Array,
      default: () => []
    },
    config: {
      type: Array,
      default: () => []
    },
    pageConf: {
      type: Object,
      default: () => ({})
    },
    searchConf: {
      type: Array,
      default: () => []
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
    }
  },
  data () {
    return {
      listorder: []
    }
  },
  methods: {
    toSearch (e) {
      this.$emit('search', e)
    },
    tableValue (conf, scope) {
      let val = scope.row
      if (conf.name.match('time')) {
        // 处理时间戳
        val = this.timestampToDate(scope.row[conf.name])
      } else if (conf.name.includes('.')) {
        // 处理嵌套字段
        const fields = conf.name.split('.')
        for (let field of fields) {
          val = val[field]
        }
      } else {
        // 一般情况
        val = scope.row[conf.name]
      }
      return conf.map ? conf.map(val) : val
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
