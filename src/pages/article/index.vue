<template lang="pug">
  div
    choc-dialog(:visible="visible"
      :title="title"
      :content="content"
      :cb="cb",
      :cancel="cancel",
      @confirm="toConfirm"
      @cancel="toCancel"
    )

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
        @submit="toSubmit"
        v-else
      )
</template>

<script>
import { tableConf, formConf, searchConf } from './config'
import { Article as Model } from 'model/Article'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      pageConf: {
        pageSize: 5
      }
    }
  },
  methods: {
    _initCMS () {
      this.setModel(Model)
      this.setName('文章')
      this.setForm(formConf)
      this.setTable(tableConf)
      this.setSearch(searchConf)
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
