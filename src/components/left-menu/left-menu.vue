<template lang="pug">
  div.container
    router-link(to="/" tag="div")
      .title
        p(v-if="isMenuCollapse") R
        p(v-else) rehellinen
    el-menu(
      class="el-menu-vertical-demo"
      active-text-color="#303133"
      text-color="#909399"
      background-color="#fff"
      :collapse="isMenuCollapse"
      :default-active="defaultActive"
    )
      router-link(v-for="(item, index) in menus" :key="item.id" tag="div" :to="item.path")
        el-menu-item(:index="indexMap.get(item.path)")
          i.el-icon-odometer(v-if="item.path === '/'")
          i.el-icon-tickets(v-else)
          span.menu-title(slot="title") {{item.name}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getRandChars } from '../../utils/utils'

export default {
  data () {
    return {}
  },
  computed: {
    defaultActive () {
      return this.indexMap.get(this.$route.path) || ''
    },
    indexMap () {
      const map = new Map()
      if (this.menus.length === 0) {
        return map
      }
      for (let menu of this.menus) {
        map.set(menu.path, getRandChars())
      }
      return map
    },
    ...mapState(['menus', 'isMenuCollapse'])
  },
  mounted () {
    this.getMenus()
  },
  methods: {
    ...mapActions(['getMenus'])
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"
  .container
    .el-menu
      border: 0
    ul
      height: 100%
  .menu-title
    margin-left: 10px
  .title
    display: flex
    justify-content: center
    align-items: center
    height: 80px
    background: linear-gradient(230deg, rgb(244, 121, 133), #843cf6)
    border-bottom: 1px solid $border-one
    p
      color: white
      font-weight: bold
      font-size: $biggest-font-size
      letter-spacing: 2px
</style>
