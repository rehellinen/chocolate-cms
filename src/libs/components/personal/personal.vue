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
          .desc
            p.title 诚实
            p.auth 超级管理员
        ul.actions
          li(@click="editPwd")
            i.el-icon-edit
            p 修改密码
          li(@click="lock")
            i.el-icon-lock
            p 锁定
          li(@click="logout")
            i.el-icon-user
            p 退出账户
</template>

<script>
export default {
  props: {
    big: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    editPwd () {
    },
    lock () {
    },
    logout () {
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .portrait
    box-sizing: border-box
    height: 40px
    width: 40px
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15)
    border: 3px solid #fff
    border-radius: 50%
    margin-right: 4px
    &.big
      margin-right: 10px
      width: 50px
      height: 50px
      border: 4px solid #fff
  .user-dropdown
    width: 300px
    height: 190px
    padding: 0
    margin: 0 !important
    border-radius: 5px
    overflow: hidden
    /deep/ .popper__arrow
      display: none
    .user
      height: 100px
      display: flex
      align-items: center
      background: $red-pink
      img
        width: 60px
        height: 60px
        margin: 0 15px
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15)
        border: 3px solid #fff
        border-radius: 50%
      .desc
        margin-top: -10px
        p
          color: white
        .title
          font-size: $big-font-size
          font-weight: bold
          letter-spacing: 1px
        .auth
          font-size: $smaller-font-size
          margin-top: 5px
          border: 1px solid $gray
          padding: 0 5px
          border-radius: 10px
          background-color: rgba(0, 0, 0, 0.1)
      span
        margin-left: 25px
        font-weight: bold
        color: white
        font-size: $big-font-size
    .actions
      height: 90px
      display: flex
      justify-content: space-around
      align-items: center
      li
        display: flex
        flex-direction: column
        align-items: center
        color: $normal-font-color
        cursor: pointer
      i
        font-size: 20px
        margin-bottom: 10px
  .de
</style>
