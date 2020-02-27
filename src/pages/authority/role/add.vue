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
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
