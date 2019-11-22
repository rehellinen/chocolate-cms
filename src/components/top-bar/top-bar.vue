<template lang="pug">
  .top-bar
    .operation
      p 顶部栏
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
      &.active
        background: $blue-purple
        color: white
      i
        position: absolute
        top: 3px
        right: 3px
  .de
</style>
