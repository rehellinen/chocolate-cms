<template lang="pug">
  my-form.card(
    v-else-if="type === allTypes.ADD"
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

</style>
