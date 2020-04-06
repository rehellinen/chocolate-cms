<template lang="pug">
  .personal
    el-dropdown(trigger="click")
      span.el-dropdown-link
        img.portrait(:src="avatar")
      el-dropdown-menu.user-dropdown(slot="dropdown")
        .user
          .image
            img(:src="avatar")
            label
              i.el-icon-edit
              input(@change="uploadImage" accept="image/*" type="file" ref="imageInput")
          .desc
            p.title(v-show="!isEditingName") {{ username }}
              i.el-icon-edit(@click="editName")
            el-input(
              @blur="nameBlur"
              placeholder="请输入用户名"
              size="small"
              ref="nameInput"
              v-model="username"
              v-show="isEditingName"
            )
            p.auth {{ user.role && user.role.name }}
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
    choc-dialog(
      :title="formConf.name"
      :visible.sync="dialogFormVisible"
      :showFooter="false"
      :showClose="true"
      width="45%"
    )
      my-form(
        :config="formConf.form"
        :form-data="formData"
        :rules="rules"
        @submit="toSubmit"
      )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { User } from 'libs/model/User'
import MyForm from 'libs/base/form/form'
import { passwordFormConf, lockedFormConf, passwordRules } from './config'

export default {
  components: {
    MyForm
  },
  data () {
    return {
      avatar: '/src/assets/images/user@portrait.jpg',
      username: '诚实',
      isEditingName: false,
      dialogFormVisible: false,
      formData: {},
      formConf: {
        name: '',
        form: []
      },
      rules: []
    }
  },
  computed: {
    ...mapGetters(['user', 'isLocked', 'isLogin'])
  },
  async created () {
    await this.init()
  },
  methods: {
    async init () {
      if (this.isLogin) {
        const res = await User.getUser()
        this.avatar = res.avatar !== 'no' ? res.avatar : this.avatar
        this.username = res.name
      }
    },
    editPwd () {
      this.formData = {}
      this.dialogFormVisible = true
      this.formConf = passwordFormConf
      this.rules = {}
    },
    lock () {
      this.formData = {}
      localStorage.setItem('locked_' + this.user.id, '1')
      if (!localStorage.getItem('lockedPwd_' + this.user.id) || localStorage.getItem('lockedPwd_' + this.user.id) === '') {
        this.dialogFormVisible = true
        this.rules = passwordRules
        this.formConf = lockedFormConf
      } else {
        this.$message.success('锁定成功')
        this.$router.push('/lock')
      }
    },
    editName () {
      this.isEditingName = true
      this.$nextTick(() => this.$refs.nameInput.focus())
    },
    async nameBlur (e) {
      this.isEditingName = false
      try {
        await User.changeName(e.target.value)
        this.$message({
          message: '修改名称成功',
          type: 'success'
        })
      } catch (e) {
        this.$message({
          message: `修改失败 - ${e.message}`,
          type: 'error'
        })
      }
    },
    async uploadImage (event) {
      const file = event.target.files[0]
      // 限制文件大小为2M
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error('图片大小超过2M')
        this.clearFile(this.$refs.imageInput)
        return
      }
      await User.editPortrait(file)
      this.init()
    },
    // 清空input中的file
    clearFile (ele) {
      ele.value = ''
    },
    toSubmit (e) {
      if (this.formConf.name === '修改密码') this.changePw(e)
      else if (this.formConf.name === '锁定') this.lockedPage(e)
    },
    changePw (e) {
      if (e.newPassword !== e.newPassword1) {
        this.$message.error('两次新密码不一致')
        return
      }
      User.changePw(e.oldPassword, e.newPassword).then(res => {
        if (res.status === 1) {
          this.$message.success(res.message)
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    lockedPage (e) {
      let password = window.btoa(e.password)
      localStorage.setItem('lockedPwd_' + this.user.id, password)
      this.dialogFormVisible = false
      this.$message.success('锁定成功')
      this.$router.push('/lock')
    },
    ...mapActions(['logout'])
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .edit-pwd
    width: 300px

  .portrait
    box-sizing: border-box
    height: 40px
    width: 40px
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.10)
    border: 3px solid white
    border-radius: 50%
  .user-dropdown
    width: 320px
    height: 210px
    padding: 0
    margin: 0 !important
    border: 0
    border-radius: $border-radius
    overflow: hidden
    /deep/ .popper__arrow
      display: none
    .user
      height: 110px
      display: flex
      align-items: center
      background: $theme-color
      .image
        img
          vertical-align: bottom
          width: 60px
          height: 60px
          margin: 0 20px
          border: 3px solid #fff
          border-radius: 50%
        label
          opacity: 0
          background: rgba(0, 0, 0, .3)
          transition: all .5s
          width: 60px
          height: 60px
          position: absolute
          left: 23px
          top: 25px
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
          .el-icon-edit
            font-size: $normal-font-size
            margin-left: 10px
            cursor: pointer
        .el-input
          height: 25px
          line-height: 25px
          /deep/ .el-input__inner
            height: 25px
            padding: 0 5px
            &:hover, &:focus
              border-color: #DCDFE6
        .auth
          display: inline-block
          text-align: center
          font-size: $smallest-font-size
          border: 1px solid $gray
          padding: 1px 15px
          margin-top: 5px
          border-radius: 15px
          background-color: rgba(0, 0, 0, 0.1)
    .actions
      height: 100px
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
