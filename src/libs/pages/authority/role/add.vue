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
import { roleFormConf, roleRules } from './config'
import { Role } from 'libs/model/Role'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      formData: {},
      rules: roleRules
    }
  },
  methods: {
    _initCMS () {
      this.setName('添加分组')
      this.setForm(roleFormConf)
    },
    async toSubmit (e) {
      await Role.addRole(e)
      this.$message.success('添加分组成功')
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
