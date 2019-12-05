<template lang="pug">
  .personal
    el-dropdown(trigger="click")
      span.el-dropdown-link
        img.portrait(
          src="../../../assets/images/user@portrait.jpg"
          :class="{ big }"
        )
      el-dropdown-menu.user-dropdown(slot="dropdown")
        .user
          img(src="../../../assets/images/user@portrait.jpg")
          span 诚实
</template>

<script>
export default {
  props: {
    big: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .personal
    padding-right: 20px
  .portrait
    box-sizing: border-box
    height: 40px
    width: 40px
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15)
    border: 3px solid #fff
    border-radius: 50%
    &.big
      width: 50px
      height: 50px
      border: 4px solid #fff
  .user-dropdown
    width: 300px
    height: 200px
    padding: 0
    margin: 0 !important
    border-radius: 5px
    overflow: hidden
    /deep/ .popper__arrow
      display: none
    .user
      height: 100px
      line-height: 100px
      vertical-align: middle
      background-size: cover
      background-image: url("../../../assets/images/user@bg.jpg")
      img
        width: 70px
        height: 70px
        margin-left: 10px
        vertical-align: middle
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15)
        border: 5px solid #fff
        border-radius: 50%
      span
        margin-left: 25px
        font-weight: bold
        color: white
        font-size: $big-font-size
  .de
</style>
