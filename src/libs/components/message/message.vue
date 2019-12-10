<template lang="pug">
  .message
    el-dropdown(trigger="click")
      span.el-dropdown-link
        el-badge.pointer(:value="5" :max="99")
          i.el-icon-bell
      el-dropdown-menu.messages(slot="dropdown")
        .notify
          span 2 New Notifications
          el-badge(:value="5" :max="99")
        .single
          el-button(type="primary" icon="el-icon-bell" circle)
          .text
            .title Events near you
            .desc Within next 5 days
        .single
          el-button(type="primary" icon="el-icon-bell" circle)
          .text
            .title Events near you
            .desc Within next 5 days
        .single
          el-button(type="primary" icon="el-icon-bell" circle)
          .text
            .title Events near you
            .desc Within next 5 days
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
      color: $grey
  .pointer
    cursor: pointer

  .messages
    padding: 0

    /deep/ .popper__arrow
      display: none

    .notify
      background: $gray
      height: 50px
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 10px 0 20px
      span
        font-size: $normal-font-size
        color: $dark

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
