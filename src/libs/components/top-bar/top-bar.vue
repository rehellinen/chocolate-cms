<template lang="pug">
  .top-bar
    .operation
      i(
        @click="changeMenuCollapseStatus"
        :class="isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        )
      p REHELLINEN
    .history(v-if="history.length > 1 && menus.length > 0")
      router-link(
        v-for="(item, index) in history" :key="item.path"
        class="tab"
        :class="{ active: item.path === $route.path }"
        :to="item.path"
        tag="div"
      )
        span {{item.title}}
        i.el-icon-close(@click.stop="close(index)")
        .corner.left
          .shelter
        .corner.right
          .shelter
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      history: [],
      historyStorageKey: 'history'
    }
  },
  computed: {
    ...mapGetters(['getMenuByPath']),
    ...mapState(['isMenuCollapse', 'menus'])
  },
  watch: {
    $route (newRoute) {
      if (this.history.some((item) => item.path === newRoute.path)) {
        return
      }
      const newHistory = this.getMenuByPath(newRoute.path)
      if (!newHistory) {
        return
      }
      this.history.push({
        path: newHistory.path,
        title: newHistory.title
      })
    }
  },
  created () {
    // 关闭窗口时保存history
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(this.historyStorageKey, JSON.stringify(this.history))
    })
    this.init()
  },
  methods: {
    init () {
      if (this.history.length === 0) {
        this.history = JSON.parse(
          localStorage.getItem(this.historyStorageKey)
        ) || []
      }
    },
    // 关闭其中一个Tab
    close (index) {
      if (this.$route.path === this.history[index].path) {
        if (this.history.length === 1) {
          this.$router.push('/')
        } else if (index === this.history.length - 1) {
          this.$router.push(this.history[index - 1].path)
        } else {
          this.$router.push(this.history[index + 1].path)
        }
      }
      this.history.splice(index, 1)
    },
    ...mapActions(['changeMenuCollapseStatus'])
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base.sass"

  .top-bar
    height: 80px
    display: flex
    flex-direction: column
    justify-content: center
    background-color: white
  .operation
    height: 50px
    display: flex
    align-items: center
    padding-left: 20px
    i
      font-size: 20px
    p
      margin-left: 10px
      letter-spacing: 3px
  .history
    width: 100%
    height: 30px
    display: flex
    overflow: hidden
    .tab
      background-color: white
      color: $minor-font-color
      margin-right: 3px
      cursor: pointer
      width: 100px
      line-height: 30px
      text-align: center
      position: relative
      border-radius: 5px 5px 0 0
      flex: none
      .corner
        display: none
        width: 10px
        height: 10px
        position: absolute
        background: $gray
        bottom: 0
        z-index: 10
        .shelter
          width: 10px
          height: 10px
          background-color: white
        &.right
          right: 0
          margin-right: -10px
          .shelter
            border-bottom-left-radius: 100%
        &.left
          left: 0
          margin-left: -10px
          .shelter
            border-bottom-right-radius: 100%
      &.active
        background: $gray
        .corner
          display: block
      i
        position: absolute
        top: 3px
        right: 3px
  .de
</style>
