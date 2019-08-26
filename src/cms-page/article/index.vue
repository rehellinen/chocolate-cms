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
      :config="table"
      :data="data"
      :pageConf="pageConf"
      :searchConf="search"
      @clear="toClear"
      @search="toSearch"
      @changePage="changePage"
      @add="toAdd"
      @edit="toEdit",
      @delete="deleteData"
      @order="changeOrder"
      @status="changeStatus"
    )

    my-form(
      v-else-if="type === allTypes.ADD"
      :title="'添加' + name"
      :config="form",
      :form-data="formData"
      @submit="toSubmit"
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
import { cmsMixin, dialogMixin, pageMixin } from '../../mixins'
import { tableConf, formConf, searchConf } from './config'
import { ArticleModel as Model } from '../../model/ArticleModel'

export default {
  mixins: [cmsMixin, dialogMixin, pageMixin],
  methods: {
    _initCMS () {
      this._setModel(new Model())
      this._setName('新闻')
      this._setForm(formConf)
      this._setTable(tableConf)
      this._setSearch(searchConf)
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
</style>
