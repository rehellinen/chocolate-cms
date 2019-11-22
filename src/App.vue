<template lang="pug">
  el-container.wrapper
    el-aside(width="230px" v-if="!isLoginPage")
      left-menu
    el-container
      el-main
        top-bar
        router-view.main
</template>

<script>
import LeftMenu from './components/left-menu/left-menu'
import TopBar from './components/top-bar/top-bar'

export default {
  components: {
    LeftMenu,
    TopBar
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
      this.isLoginPage = this.$route.path === '/login'
    }
  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "~sass/reset"
  @import "~sass/base"

  .wrapper
    min-height: 100vh
    font-family: 'PingFang SC','Microsoft YaHei',sans-serif
    .el-header
      padding: 0
      border-bottom: 1px solid $border-one
      box-shadow: 10px $gray
    .el-main
      background-color: $gray
      padding: 0
      .main
        padding: 20px 30px
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
