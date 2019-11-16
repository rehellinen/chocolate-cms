<template lang="pug">
  .progress-bar(:class="'my-'+type")
    .progress-items(v-for="(item, index) in data" :key="index")
      .title {{item.title}}
      el-progress(
      :percentage="50"
      :type="type"
      :stroke-width="12"
      :class="'el-progress-'+ index"
      )
</template>

<script>
export default {
  props: {
    data: { // 进度条数据
      type: Array,
      default: null
    },
    type: { // 进度条类型
      type: String,
      default: 'line'
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"
  .progress-bar
    background-color: white
    border-radius: 10px
    padding: 20px
    .el-progress
      margin: 10px
    .el-progress-0
      /deep/ .el-progress-bar__inner
        background: $blue-purple
    .el-progress-1
      /deep/ .el-progress-bar__inner
        background: $yellow-orange
    .el-progress-2
      /deep/ .el-progress-bar__inner
        background: $blue-mazarine
    .title
      margin-left: 10px
  .my-circle
    display: flex
    flex-direction: row
    flex-wrap: wrap
    .progress-items
      display: flex
      flex-direction: column
      align-items: center
    .title
      margin: 0
</style>
