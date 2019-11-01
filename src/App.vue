<template lang="pug">
  el-container.wrapper
    el-aside(width="230px" v-if="!isLoginPage")
      left-menu
    el-container
      el-main
        router-view
</template>

<script>
import LeftMenu from './components/left-menu/left-menu'

export default {
  components: {
    LeftMenu
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
