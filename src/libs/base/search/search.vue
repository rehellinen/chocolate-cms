<template lang="pug">
  div.search-container
    el-select(
      @change="selectorChange"
      v-model="field"
      placeholder="请选择字段"
    )
      el-option(
        v-for="(item, index) in searchConf"
        :key="index"
        :label="item.label"
        :value="item.field"
      )
    el-input(placeholder="请输入搜索关键字"  v-model="searchStr")
    el-button(@click="toSearch" icon="el-icon-search" circle )
    el-button(@click="toClear" icon="el-icon-close" circle )
</template>

<script>
export default {
  name: 'ChocSearch',
  props: {
    searchConf: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      field: '',
      foreign_model: '',
      foreign_field: '',
      searchStr: ''
    }
  },
  methods: {
    toSearch () {
      this.$emit('search', {
        field: this.field,
        foreign_model: this.foreign_model,
        foreign_field: this.foreign_field,
        searchStr: this.searchStr
      })
    },
    selectorChange (field) {
      this.searchConf.forEach(item => {
        if (item.field === field) {
          this.foreign_model = item.foreign_model
          this.foreign_field = item.foreign_field
        }
      })
    },
    toClear () {
      this.$emit('clear')
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .search-container
    margin-bottom: 10px
    display: flex
    .el-select
      width: 150px
      margin-right: 10px
    .el-input
      width: 250px
      margin-right: 10px
  .de
</style>
