<template lang="pug">
  div
    el-row(:gutter="5")
      el-col(:xl="17" :lg="17" :md="16" :sm="24" :xs="24")
        router-view
      el-col.hidden-sm-and-down(:xl="7" :lg="7" :md="8")
        side-bar
</template>

<script>
import SideBar from '../../base/side-bar/side-bar'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  components: {
    SideBar
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .el-col
    height: 100%
</style>
