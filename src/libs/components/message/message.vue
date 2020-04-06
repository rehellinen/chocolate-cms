<template lang="pug">
  .message
    el-dropdown(trigger="click")
      span.el-dropdown-link
        el-badge.pointer(:value="5" :max="99")
          i.el-icon-bell
      el-dropdown-menu.messages(slot="dropdown")
        .message__header
          span.message__title 3 新通知
        .single
          el-button(type="primary" icon="el-icon-bell" circle)
          .text
            .title 未完成
            .desc 敬请期待
        .single
          el-button(type="primary" icon="el-icon-bell" circle)
          .text
            .title 未完成
            .desc 敬请期待
        .single
          el-button(type="primary" icon="el-icon-bell" circle)
          .text
            .title 未完成
            .desc 敬请期待
</template>

<script>
export default {}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .message
    padding: 0
    margin-right: 25px
    .el-icon-bell
      font-size: 18px
      font-weight: bold
      color: $normal-font-color
  .pointer
    cursor: pointer

  .messages
    padding: 0
    border: 0
    border-radius: $border-radius
    overflow: hidden

    /deep/ .popper__arrow
      display: none

    .message__header
      background: $theme-color
      height: 50px
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 10px 0 20px
      .message__title
        font-size: $normal-font-size
        color: white

    .single
      display: flex
      align-items: center
      margin: 0 20px
      padding: 15px 0
      width: 280px
      border-bottom: 1px solid $border-one
      &:nth-last-child(2)
        border-bottom: none
      .el-button
        margin-right: 15px
      .text
        display: flex
        flex-direction: column
        div
          cursor: pointer
        .title
          color: $dark
          font-size: $normal-font-size
          margin-bottom: 8px
        .desc
          color: $grey
  .de
</style>
