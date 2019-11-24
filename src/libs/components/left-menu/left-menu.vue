<template lang="pug">
  div.container
    .title
      transition(name="fade" mode="out-in")
        p(v-if="isMenuCollapse" :key="'R'") R
        p(v-else :key="'rehellinen'") rehellinen
    el-menu(
      class="el-menu-vertical-demo"
      active-text-color="#303133"
      text-color="#909399"
      background-color="#fff"
      :collapse="isMenuCollapse"
      :default-active="defaultActive"
    )
      template(v-for="menu in menus")
        // 二级菜单的情况
        el-submenu(
          v-if="menu.children && menu.children.length > 0"
          :index="indexMap.get(menu.path)"
          :key="menu.id"
        )
          template(slot="title")
            i(:class="menu.icon")
            span.menu-title(slot="title") {{menu.title}}

          router-link(
            tag="div"
            v-for="submenu in menu.children"
            :key="indexMap.get(submenu.path)"
            :to="submenu.path"
          )
            el-menu-item(:index="indexMap.get(submenu.path)")
              i(:class="submenu.icon")
              span.menu-title(slot="title") {{submenu.title}}

        // 只有一级菜单的情况
        router-link(
          tag="div"
          :to="menu.path"
          v-else
        )
          el-menu-item(:index="indexMap.get(menu.path)")
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
      if (this.menus.length === 0) {
        return map
      }
      for (let menu of this.plainMenus) {
        map.set(menu.path, getRandChars())
      }
      return map
    },
    ...mapGetters(['plainMenus', 'menus', 'isMenuCollapse'])
  },
  watch: {
    $route (newRoute) {
      this.defaultActive = this.indexMap.get(this.$route.path) || ''
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base.sass"
  .fade-enter-active, .fade-leave-active
    transition: opacity 0.3s
  .fade-enter, .fade-leave-to
    opacity: 0
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
      cursor: pointer
    p
      color: white
      font-weight: bold
      font-size: $biggest-font-size
      letter-spacing: 2px
      transition: all 0.5s ease-in-out
</style>
