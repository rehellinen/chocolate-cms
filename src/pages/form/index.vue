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
import { Article } from 'model/Article'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  methods: {
    _initCMS () {
      this.setModel(new Article())
      this.setName('form表单')
      this.setForm(formConf)
    },
    submit () {
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .form
    @include card(10px, 10px)
</style>
