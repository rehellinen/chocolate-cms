<template lang="pug">
  el-container.wrapper
    el-header(height="160px")
      my-header

    el-main(v-if="isLoginPage")
      router-view
    el-container(v-else)
      el-aside(width="250px")
        left-menu
      el-main
        my-table-view
    el-footer(height="190px")
      my-footer
</template>

<script>
import MyHeader from './components/header/header'
import MyFooter from './components/footer/footer'
import LeftMenu from './components/left-menu/left-menu'
import MyTableView from './view/table'

export default {
  components: {
    MyHeader,
    MyFooter,
    LeftMenu,
    MyTableView
  },
  data () {
    return {
      isLoginPage: false
    }
  },
  watch: {
    $route () {
      this.updateLayout()
    }
  },
  created () {
    this.updateLayout()
  },
  methods: {
    updateLayout () {
      // this.isLoginPage = this.$route.path === '/login'
    }
  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "~sass/reset"
  @import "~sass/base"

  .wrapper
    min-height: 100vh
    .el-header
      padding: 0
      border-bottom: 1px solid $border-one
    .el-main
      background-color: $background-color
      padding: 30px 20px
    .el-footer
      padding: 0
    p
      font-size: $normal-font-size
      color: $normal-font-color
    .line
      height: 1px
      background-color: $border-one
      width: 100%
      margin: 20px 0
</style>
