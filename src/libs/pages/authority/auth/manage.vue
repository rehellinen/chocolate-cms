<template lang="pug">
  div
    choc-dialog(:visible="visible"
      :title="title"
      :content="content"
      :cb="cb",
      :cancel="cancel"
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
import { manageTableConf, authRules } from './config'
import { Auth as Model } from 'libs/model/Auth'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      rules: authRules
    }
  },
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
    async toSubmit (e) {
      await this.model.changeAuth(e)
      this.$message.success('修改权限信息成功')
      this.getTable()
      this.toIndex()
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
