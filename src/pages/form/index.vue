<template lang="pug">
  .form
    my-form(
      :title="name"
      :config="form"
      :form-data="formData"
      @submit="submit"
    )
</template>

<script>
import { formMixin, cmsMixin, breadMixin } from 'mixins'
import { formConf } from './config'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    _initCMS () {
      this.setName('form表单')
      this.setForm(formConf)
    },
    submit () {
      this.$message.success('提交成功')
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .form
    @include card(10px, 10px)
</style>
