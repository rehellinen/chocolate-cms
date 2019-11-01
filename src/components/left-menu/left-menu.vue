<template lang="pug">
  div.container
    router-link(to="/" tag="div")
      .title
        p rehellinen
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
import { Menu } from '../../model'

export default {
  data () {
    return {
      menu: []
    }
  },
  async created () {
    // TODO: 此处使用了MOCK
    this.menu = await new Menu().getMock()
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"
  .container
    ul
      height: 100%
  .menu-title
    margin-left: 10px
  .title
    display: flex
    justify-content: center
    align-items: center
    height: 80px
    background-color: $theme-color
    border-bottom: 1px solid $border-one
    p
      color: white
      font-weight: bold
      font-size: $biggest-font-size
      letter-spacing: 2px
</style>
