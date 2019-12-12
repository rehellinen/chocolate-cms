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
import { formConf } from './config'
import { Article } from 'model/Article'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  methods: {
    _initCMS () {
      this.setModel(new Article())
      this.setName('添加文章')
      this.setForm(formConf)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
