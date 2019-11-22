<template lang="pug">
  .top-bar
    .operation
      i.el-icon-s-fold
      p CMS
    .history(v-if="history.length > 1")
      router-link(
        v-for="(item, index) in history" :key="item.path"
        class="tab"
        :class="{ active: item.path === $route.path }"
        :to="item.path"
        tag="div"
      )
        span {{item.name}}
        i.el-icon-close(@click.stop="close(index)")
        .corner.left
          .shelter
        .corner.right
          .shelter
</template>

<script>

export default {
  data () {
    return {
      history: [
        { name: '首页', path: '/' },
        { name: '菜单管理', path: '/menu' },
        { name: '文章管理', path: '/article' }
      ], // 有name，path属性
      historyStorageKey: 'history'
    }
  },
  created () {
    // 关闭窗口时保存history
    window.addEventListener('beforeunload', () => {
      localStorage.setItem(this.historyStorageKey, JSON.stringify(this.history))
    })
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
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

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
      font-size: 25px
    p
      margin-left: 10px
      letter-spacing: 3px
  .history
    width: 100%
    height: 30px
    display: flex
    .tab
      background-color: $gray
      color: $minor-font-color
      margin-right: 3px
      cursor: pointer
      width: 100px
      line-height: 30px
      text-align: center
      position: relative
      border-radius: 5px 5px 0 0
      .corner
        display: none
        width: 15px
        height: 10px
        position: absolute
        background: $blue
        bottom: 0
        z-index: 10
        .shelter
          width: 15px
          height: 10px
          background-color: $gray
        &.right
          right: 0
          margin-right: -15px
          .shelter
            border-bottom-left-radius: 100%
        &.left
          left: 0
          margin-left: -15px
          .shelter
            border-bottom-right-radius: 100%
      &.active
        background: $blue
        color: white
        .corner
          display: block
      i
        position: absolute
        top: 3px
        right: 3px
  .de
</style>
