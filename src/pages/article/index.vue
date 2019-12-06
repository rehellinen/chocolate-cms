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
import { tableConf, formConf, searchConf } from './config'
import { Article as Model } from 'model/Article'

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
      this.setModel(new Model())
      this.setName('文章')
      this.setForm(formConf)
      this.setTable(tableConf)
      this.setSearch(searchConf)
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
</style>
