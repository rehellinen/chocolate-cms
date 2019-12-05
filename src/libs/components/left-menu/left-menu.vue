<template lang="pug">
  div.left-menu
    router-link.title(tag="div", to="/")
      transition(
        name="fade"
        mode="out-in"
        :duration="300"
        )
        p(v-if="!isPhone && isMenuCollapse" :key="'C'") C
        p(v-else :key="'chocolate'") chocolate
    el-menu(
      class="el-menu-vertical-demo"
      active-text-color="#606266"
      text-color="#606266"
      background-color="#fff"
      :collapse="!isPhone && isMenuCollapse"
      :default-active="defaultActive"
    )
      template(v-for="menu in leftMenus")
        // 二级菜单的情况
        el-submenu(
          v-if="menu.children && menu.children.length > 0"
          :index="indexMap.get(menu.name)"
          :key="menu.id"
        )
          template(slot="title")
            i(:class="menu.icon")
            span.menu-title(slot="title") {{menu.title}}

          router-link(
            tag="div"
            v-for="submenu in menu.children"
            :key="indexMap.get(submenu.name)"
            :to="submenu.path"
          )
            el-menu-item(:index="indexMap.get(submenu.name)")
              i(:class="submenu.icon")
              span.menu-title(slot="title") {{submenu.title}}

        // 只有一级菜单的情况
        router-link(
          tag="div"
          :to="menu.path"
          v-else
        )
          el-menu-item(:index="indexMap.get(menu.name)")
            i(:class="menu.icon")
            span.menu-title(slot="title") {{menu.title}}
</template>

<script>
import { mapGetters } from 'vuex'
import { getRandChars } from 'utils/utils'

export default {
  data () {
    return {
      defaultActive: ''
    }
  },
  computed: {
    indexMap () {
      const map = new Map()
      if (this.plainMenus.length === 0) {
        return map
      }
      for (let menu of this.plainMenus) {
        map.set(menu.name, getRandChars())
      }
      return map
    },
    ...mapGetters(['plainMenus', 'isMenuCollapse', 'leftMenus', 'isPhone'])
  },
  watch: {
    $route (newRoute) {
      this.defaultActive = this.indexMap.get(this.$route.name) || ''
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base.sass"
  .fade-enter, .fade-leave-to
    opacity: 0

  .left-menu
    height: 100%
    background-color: white
    overflow-x: hidden

  .el-menu
    border: 0
    i
      color: $normal-font-color !important
    .is-active
      background-color: $background-color !important
    .el-menu-item
      height: 50px
      line-height: 50px
    .el-menu-item, .el-submenu
      &:hover
        background-color: $background-color !important
    /deep/ .el-submenu__title
      height: 50px
      line-height: 50px
      &:hover
        background-color: $background-color !important


  .menu-title
    margin-left: 10px
  .title
    display: flex
    justify-content: center
    align-items: center
    height: 80px
    background: linear-gradient(230deg, rgb(244, 121, 133), #843cf6)
    border-bottom: 1px solid $border-one
    cursor: pointer
    p
      color: white
      font-weight: bold
      font-size: $biggest-font-size
      letter-spacing: 2px
      transition: all 0.5s ease-in-out
</style>
