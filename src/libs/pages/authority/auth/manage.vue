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
        :searchConf="search"
        :loading="loading"
        @clear="toClear"
        @search="toSearch"
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
import { manageTableConf } from './config'
import { Auth as Model } from 'libs/model/Auth'

export default {
  mixins: [cmsMixin, dialogMixin, tableMixin, formMixin, breadMixin],
  methods: {
    _initCMS () {
      this.setModel(Model)
      this.setName('权限')
      this.setForm(manageTableConf)
      this.setTable(manageTableConf)
      this.setSearch(manageTableConf)
    },
    getTable () {
      this.model.getAllAuth().then(res => {
        this.table = res
        this.loading = false
      })
    },
    toSubmit (e) {
      this.model.changeAuth(e).then(res => {
        this.$message.success('修改权限信息成功')
        this.getTable()
        this.toIndex()
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base.sass"

  .table-card
    @include card(25px, 25px)
  .form-card
    @include card(10px, 10px)
</style>
