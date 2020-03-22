<template lang="pug">
  .progress-bar(:class="'my-'+type")
    .progress-items(v-for="(item, index) in data" :key="index")
      .title {{item.title}}
      el-progress(
      :percentage="item.percentage || 50"
      :type="type"
      :stroke-width="12"
      :class="'el-progress-'+ item.color"
      )
</template>

<script>
export default {
  name: 'ChocProgressBar',
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
  /deep/ .el-progress--circle
    margin: 5px
    .el-progress__text
      margin-left: 0!important
  .progress-bar
    .el-progress
      margin: 10px
      /deep/ .el-progress__text
        margin-left: 20px
        font-size: 14px !important
    .el-progress-purple
      /deep/ .el-progress-bar__inner
        background: $blue-purple
    .el-progress-orange
      /deep/ .el-progress-bar__inner
        background: $yellow-orange
    .el-progress-blue
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
