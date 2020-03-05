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
import { authFormConf } from './config'
import { Auth } from 'libs/model/Auth'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    _initCMS () {
      this.setName('添加权限')
      this.setForm(authFormConf)
    },
    toSubmit (e) {
      try {
        Auth.addAuth(e).then(res => {
          this.$message.success('添加权限成功')
          this.toIndex()
        })
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
