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
import { roleFormConf } from './config'
import { Role } from 'libs/model/Role'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    _initCMS () {
      this.setName('添加分组')
      this.setForm(roleFormConf)
    },
    async toSubmit (e) {
      try {
        await Role.addRole(e)
        this.$message.success('添加分组成功')
        this.toIndex()
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
