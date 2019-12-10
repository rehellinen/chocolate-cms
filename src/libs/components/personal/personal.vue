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
          .image
            img(src="../../../assets/images/user@portrait.jpg")
            label
              i.el-icon-edit
              input(@change="uploadImage" accept="image/*" type="file" ref="imageInput")
          .desc
            p.title(@click="editName" v-show="!isEditingName") 诚实
            el-input(
              @blur="nameBlur"
              placeholder="请输入用户名"
              size="small"
              ref="nameInput"
              v-model="username"
              v-show="isEditingName"
            )
            span.auth 超级管理员
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
import { User } from 'libs/model/User'

export default {
  props: {
    big: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      username: '诚实',
      isEditingName: false
    }
  },
  methods: {
    editPwd () {
    },
    lock () {
    },
    logout () {
    },
    editName () {
      this.isEditingName = true
      this.$nextTick(() => this.$refs.nameInput.focus())
    },
    nameBlur () {
      this.isEditingName = false
    },
    uploadImage (event) {
      const file = event.target.files[0]
      // 限制文件大小为2M
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('图片大小超过2M')
        this.clearFile(this.$refs.imageInput)
        return
      }
      User.editPortrait()
    },
    // 清空input中的file
    clearFile (ele) {
      ele.value = ''
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
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.10)
    border: 3px solid #fff
    border-radius: 50%
    margin-right: 10px
    &.big
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
      background: url("/src/assets/images/user@bg.jpg")
      .image
        img
          vertical-align: bottom
          width: 60px
          height: 60px
          margin: 0 15px
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15)
          border: 3px solid #fff
          border-radius: 50%
        label
          opacity: 0
          background: rgba(0, 0, 0, .3)
          transition: all .5s
          width: 60px
          height: 60px
          position: absolute
          left: 18px
          top: 20px
          display: flex
          justify-content: center
          align-items: center
          color: white
          border-radius: 50%
          cursor: pointer
          input
            display: none
          &:hover
            opacity: 1
      .desc
        margin-top: -10px
        margin-right: 15px
        p, span
          color: white
        .title
          font-size: $big-font-size
          font-weight: bold
          letter-spacing: 1px
          height: 25px
          margin-bottom: 3px
        .el-input
          height: 25px
          line-height: 25px
          margin-bottom: 3px
          /deep/ .el-input__inner
            height: 25px
            padding: 0 5px
            &:hover, &:focus
              border-color: #DCDFE6
        .auth
          font-size: $smaller-font-size
          border: 1px solid $gray
          padding: 1px 7px
          border-radius: 15px
          background-color: rgba(0, 0, 0, 0.1)
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
