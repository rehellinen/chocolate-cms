<template lang="pug">
  div
    my-dialog(:visible="visible"
      :title="title"
      :content="content"
      :cb="cb",
      :cancel="cancel",
      @confirm="toConfirm"
      @cancel="toCancel"
    )

    my-bread(
      @table="toIndex"
      :data="bread"
    )
    div(:class="type === allTypes.INDEX ? 'table-card' : 'form-card'")
      my-table(
        v-if="type === allTypes.INDEX"
        :tableColumn="tableColumn"
        :data="table"
        :pageConf="pageConf"
        :searchConf="search"
        :loading="loading"
        @clear="toClear"
        @search="toSearch"
        @changePage="changePage"
        @edit="toEdit"
        @delete="deleteData"
      )

      my-form(
        :title="'编辑' + name",
        :config="form"
        :form-data="formData"
        @submit="toSubmit"
        v-else
      )
</template>

<script>
import { cmsMixin, dialogMixin, tableMixin, formMixin, breadMixin } from 'mixins'
import { manageTableConf, manageFormConf, searchConf } from './config'
import { Authority as Model } from 'model/Authority'

export default {
  mixins: [cmsMixin, dialogMixin, tableMixin, formMixin, breadMixin],
  data () {
    return {
      pageConf: {
        pageSize: 1,
        total: 3
      }
    }
  },
  methods: {
    _initCMS () {
      this.setModel(Model)
      this.setName('分组')
      this.setForm(manageFormConf)
      this.setTable(manageTableConf)
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
