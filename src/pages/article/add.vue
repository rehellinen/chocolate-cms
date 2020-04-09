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
import { formConf, ArticleRules } from './config'
import { Article } from 'model/Article'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      rules: ArticleRules
    }
  },
  methods: {
    _initCMS () {
      this.setModel(Article)
      this.setName('添加文章')
      this.setForm(formConf)
    },
    async toSubmit (e) {
      await Article.addArticle(e)
      this.$message.success('添加文章成功')
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
