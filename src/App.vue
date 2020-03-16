<template lang="pug">
  el-container.wrapper
    template(v-if="hideMenuAndTop")
      el-main
        transition(name="router-view" mode="out-in")
          router-view
    template(v-else)
      el-aside(
        :width="asideWidth"
        :class="{ phone: isPhone, show: isPhone && !isMenuCollapse }"
      )
        left-menu
      el-container
        el-header(height="80px")
          top-bar
        el-main(:style="isPhone ? 'padding: 20px 10px' : ''")
          transition(name="router-view" mode="out-in")
            router-view
      // 手机端侧边栏遮罩
      transition(name="mask")
        .mask(
          @click="collapsePhoneMenu"
          v-if="isPhone && !isMenuCollapse"
        )
      // 返回顶部按钮
      el-backtop(target=".el-main" :right="30" :bottom="30")
</template>

<script>
/* eslint-disable no-new */

import LeftMenu from 'libs/components/left-menu/left-menu'
import TopBar from 'libs/components/top-bar/top-bar'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    LeftMenu,
    TopBar
  },
  data () {
    return {
      hideMenuAndTop: true
    }
  },
  computed: {
    asideWidth () {
      return !this.isPhone && this.isMenuCollapse
        ? '65px'
        : '190px'
    },
    ...mapGetters(['isMenuCollapse', 'isPhone', 'isLogined'])
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.hideMenuAndTop = this.$route.path === '/login'
        console.log(this.isLogined)
        if (this.$route.path === '/login' ||
          (this.$route.path === '/404' && !this.isLogined)) {
          this.hideMenuAndTop = true
        } else {
          this.hideMenuAndTop = false
        }
        if (this.isPhone && !this.isMenuCollapse) {
          this.changeMenuCollapseStatus()
        }
      }
    }
  },
  created () {
    this.setSize()
    this.setEvent()
  },
  methods: {
    setEvent () {
      window.addEventListener('resize', (event) => this.setSize())
    },
    setSize () {
      if (document.body.clientWidth < 700) {
        this.setPhoneStatus(true)
      } else {
        this.setPhoneStatus(false)
      }
    },
    collapsePhoneMenu () {
      this.changeMenuCollapseStatus()
    },
    ...mapActions(['changeMenuCollapseStatus', 'setPhoneStatus'])
  }
}
</script>

<style lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .router-view-enter-active, .router-view-leave-active
    transition: opacity .2s ease-in-out
  .router-view-enter, .router-view-leave-to
    opacity: 0

  .mask-enter-active, .mask-leave-active
    transition: opacity .2s ease-in-out
  .mask-enter, .mask-leave-to
    opacity: 0

  .wrapper
    height: 100vh
    font-family: 'PingFang SC','Microsoft YaHei',sans-serif
    // 解决表格线条对不齐的问题
    .el-table th.gutter
      display: table-cell!important
    // 侧边栏样式
    .el-aside
      transition: all 0.3s ease-in-out
      &.phone
        position: absolute
        z-index: 999
        height: 100vh
        transform: translateX(-215px)
      &.show
        transform: translateX(0)
    // 顶部栏样式
    .el-header
      padding: 0
    // 主内容样式
    .el-main
      background-color: $background-color
      overflow-y: auto
      padding: 20px 30px
      box-sizing: border-box

    // 默认字体格式
    p
      font-size: $normal-font-size
      color: $normal-font-color
  // 手机端侧边栏遮罩
  .mask
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background-color: rgba(0, 0, 0, .3)
    z-index: 100
</style>
