<template lang="pug">
  .add
    my-form(
      :title="name"
      :config="form",
      :form-data="formData"
      @submit="toSubmit"
    )
</template>

<script>
import { formMixin, cmsMixin, breadMixin } from 'mixins'
import { userConf } from './config'
import { User as Model } from 'libs/model/User'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    _initCMS () {
      this.setModel(Model)
      this.setName('添加用户')
      this.setForm(this.getUserFormConf())
    },
    getUserFormConf () {
      this.model.getAllAuth().then(res => {
        userConf[4].options = res
      })
      return userConf
    },
    toSubmit (e) {
      this.model.addUserInfo(e).then(res => {
        this.$message.success('添加用户成功')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
