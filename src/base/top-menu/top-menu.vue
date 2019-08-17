<template lang="pug">
  div.menu-container
    div.menu(v-for="(item, index) in menu" :index="(index + 1).toString()" :key="item.id")
      router-link(tag="a" :to="item.url")
        p(:class="isActive(item.url)") {{item.name}}
      .arrow
</template>

<script>
import { MenuModel } from '../../model/MenuModel'
const Menu = new MenuModel()

export default {
  data () {
    return {
      menu: []
    }
  },
  created () {
    this._getMenu()
  },
  methods: {
    async _getMenu () {
      this.menu = await Menu.getFrontMenu()
    },
    isActive (path) {
      return {
        active: this.$route.path === path
      }
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .menu-container
    display: flex
    justify-content: space-between
    width: 100%
    .menu
      max-width: 120px
      border: 0
      margin-right: 8px
      display: flex
      justify-content: flex-end
      align-items: center
      a
        text-decoration: none
      p
        font-size: $normal-font-size
        /*font-weight: bold*/
        color: $minor-font-color
      .active
        color: $normal-font-color
        font-weight: bold
      .arrow
        width: 5px
        height: 5px
        margin-top: 1px
        border-right: 1px solid $holder-font-color
        border-top: 1px solid $holder-font-color
        transform: rotate(45deg)
        margin-left: 10px
  .de
</style>
