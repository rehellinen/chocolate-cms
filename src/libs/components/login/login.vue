<template lang="pug">
  div.container
    my-dialog(:visible="visible"
    :title="title"
    :content="content",
    :cb="cb"
    @close="closeDialog")
    el-form(ref="form" :model="form" label-width="80px")
      p.title Chocolate Disco
      el-input(v-model="form.name" placeholder="请输入用户名")
      el-input(v-model="form.password" placeholder="请输入密码" show-password)
      el-button(@click="onSubmit") 登录
</template>

<script>
import { dialogMixin } from 'mixins'
import { Token } from 'libs/class/Token'
import config from 'config'

export default {
  mixins: [dialogMixin],
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    _getData () {},
    async onSubmit (e) {
      const token = new Token(this.form.name, this.form.password)
      const res = await token.getTokenFromServer()
      this.openDialog({
        title: '提示',
        content: res.message,
        cb: () => {
          if (res.status === 1) {
            const type = token.getTypeFromCache()
            if (type === config.ADMIN_TYPE.TEACHER) {
              this.$router.push('/user_event')
            } else {
              this.$router.push('/')
            }
          } else {
            this.closeDialog()
          }
        },
        showCancel: true
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base.sass"
  .container
    height: 100%
    width: 100%
    background-color: $background-color
    display: flex
    align-items: center
    justify-content: center
    .el-form
      @include card
      box-shadow: 6px 11px 41px -28px #a99de7
      width: 80%
      max-width: 540px
      height: 300px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-around
      padding-bottom: 20px
      .title
        color: $main-font-color
        font-size: $vast-font-size
        font-weight: bold
        margin-bottom: 15px
      .el-input
        /deep/ input
          height: 50px
          border: none
          border-bottom: 1px solid $background-color
      .el-button
        width: 100%
        height: 50px
        color: white
        background: $primary
        font-size: $big-font-size
</style>
