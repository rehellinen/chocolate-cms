<template lang="pug">
  div.container
    el-menu(
      default-active="0"
      class="el-menu-vertical-demo"
      active-text-color="#303133"
      text-color="#909399"
      background-color="#fff"
    )
      router-link(v-for="(item, index) in menu" :key="item.id" tag="div" :to="item.url")
        el-menu-item(:index="index.toString()")
          i.el-icon-menu
          span.menu-title(slot="title") {{item.name}}
</template>

<script>
import { MenuModel } from '../../model/MenuModel'
import { Token } from '../../utils/Token'
import config from '../../utils/config'

const menu = new MenuModel()

export default {
  data () {
    return {
      menu: []
    }
  },
  async created () {
    const menus = await menu.getNormal()
    const type = new Token().getTypeFromCache()
    if (type === config.ADMIN_TYPE.TEACHER) {
      this.menu = menus.filter(item => config.TEACHER_PAGE.includes(item.url))
    } else {
      this.menu = menus
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"
  .container
    height: 100%
    ul
      height: 100%
  .menu-title
    margin-left: 15px
</style>
