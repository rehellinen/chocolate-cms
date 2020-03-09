<template lang="pug">
  .add
    choc-form(
      :title="name"
      :config="form",
      :form-data="formData"
      @submit="toSubmit"
    )
</template>

<script>
import { formConf } from './config'
import { Article } from 'model/Article'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
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
