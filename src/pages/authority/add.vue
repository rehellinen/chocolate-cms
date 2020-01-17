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
import { userFormConf } from './config'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  methods: {
    _initCMS () {
      this.setName('添加用户')
      this.setForm(userFormConf)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
