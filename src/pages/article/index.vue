<template lang="pug">
  div
    choc-bread(
      @table="toIndex"
      :data="bread"
    )
    div(:class="type === allTypes.INDEX ? 'table-card' : 'form-card'")
      choc-table(
        v-if="type === allTypes.INDEX"
        :tableColumn="tableColumn"
        :data="table"
        :pageConf="pageConf"
        :searchConf="search"
        :loading="loading"
        @clear="toClear"
        @search="toSearch"
        @edit="toEdit"
        @delete="deleteData"
      )

      choc-form(
        :title="'编辑' + name",
        :config="form"
        :form-data="formData"
        :rules="rules"
        @submit="toSubmit"
        v-else
      )
</template>

<script>
import { tableConf, formConf, searchConf, ArticleRules } from './config'
import { Article as Model } from 'model/Article'
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
      this.setModel(Model)
      this.setName('文章')
      this.setForm(formConf)
      this.setTable(tableConf)
      this.setSearch(searchConf)
    },
    async getTable () {
      const res = await Model.getArticle()
      this.table = res.data
      this.setPage(res)
      this.loading = false
    },
    async toSubmit (e) {
      await this.model.editArticle(e)
      this.$message.success('修改文章成功')
      this.getTable()
      this.toIndex()
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .table-card
    @include card(25px, 25px)
  .form-card
    @include card(10px, 10px)
</style>
