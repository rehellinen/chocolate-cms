<template lang="pug">
  .progress-bar
    el-progress(v-for="(item, index) in data" :key="index"
    :percentage="50"
    :type="type"
    :stroke-width="15"
    :color="item.color")
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
  .progress-bar
    background-color: white
    margin: 10px
    border-radius: 10px
    padding: 20px
    .el-progress
      margin: 10px
</style>
