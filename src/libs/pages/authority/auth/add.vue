<template lang="pug">
  .add
    choc-form(
      :title="name"
      :config="form",
      :form-data="formData"
      :rules="rules"
      @submit="toSubmit"
    )
</template>

<script>
import { authFormConf, authRules } from './config'
import { Auth } from 'libs/model/Auth'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      rules: authRules
    }
  },
  methods: {
    _initCMS () {
      this.setName('添加权限')
      this.setForm(authFormConf)
    },
    async toSubmit (e) {
      await Auth.addAuth(e)
      this.$message.success('添加权限成功')
      this.toIndex()
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
