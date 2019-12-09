<template lang="pug">
  div.container
    my-dialog(:visible="visible"
    :title="title"
    :content="content",
    :cb="cb"
    @close="closeDialog")
    el-form(ref="form" :model="form" label-width="80px")
      p.title 管理员登录
      el-form-item(label="账号：")
        el-input(v-model="form.name")

      el-form-item(label="密码：")
        el-input(v-model="form.password" show-password)

      el-form-item
        el-button(@click="onSubmit") 登录
</template>

<script>
import { dialogMixin, cmsMixin } from 'mixins'
import { Token } from 'libs/class/Token'
import config from 'config'

export default {
  mixins: [dialogMixin, cmsMixin],
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
    padding: 0 10%
    .el-form
      max-width: 500px
    .title
      color: $main-font-color
      font-size: $vast-font-size
      font-weight: bold
      margin-bottom: 15px
      margin-left: 80px
</style>
