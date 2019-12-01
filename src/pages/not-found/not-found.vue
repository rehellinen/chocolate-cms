<template lang="pug">
  .not-found
    .card.el-col-xl-13.el-col-lg-14.el-col-md-16.el-col-sm-18.el-col-xs-24
      p.title 404
      .desc
        i.el-icon-circle-close
        span Not Found
      router-link.button(to="/" tag="div")
        el-button(type="primary") Go to homepage
      p.copyright Copyright © Developed by rehellinen and muzi
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .not-found
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    .card
      text-align: center
      .title
        display: inline-block
        font-size: 70px
        margin: 0
        color: $primary
        background: $blue-purple
        -webkit-text-fill-color: transparent
        -webkit-background-clip: text
      .desc
        font-size: $normal-font-size
        font-weight: bold
        i
          margin-right: 5px
      .button
        margin: 30px 0
      .el-button
        padding: 10px 20px
        background-color: $primary
        &:hover
          background-color: $blue
      .copyright
        color: $minor-font-color
        font-size: $small-font-size
  .de
</style>
