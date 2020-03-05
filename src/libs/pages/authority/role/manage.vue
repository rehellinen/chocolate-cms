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
        :operate="operate"
        @clear="toClear"
        @search="toSearch"
        @edit="toEdit"
        @delete="deleteData"
      )

      my-form(
        :title="'编辑' + name"
        :form-data="formData"
        :config="form"
        @submit="toSubmit"
        v-else
      )
</template>

<script>
import { cmsMixin, dialogMixin, tableMixin, formMixin, breadMixin } from 'mixins'
import { manageTableConf, authFormConf } from './config'
import { Role as Model } from 'libs/model/Role'
import { Auth } from 'libs/model/Auth'
import config from 'config/index'

export default {
  mixins: [cmsMixin, dialogMixin, tableMixin, formMixin, breadMixin],
  data () {
    return {
      operate: [{
        type: 'primary',
        name: '编辑权限',
        func: this.editAuth
      }]
    }
  },
  methods: {
    _initCMS () {
      this.setModel(Model)
      this.setName('分组')
      this.setForm(manageTableConf)
      this.setTable(manageTableConf)
      this.setSearch(manageTableConf)
    },
    getTable () {
      this.model.getAllRole().then(res => {
        this.setPage(res)
        this.table = res.data
        this.loading = false
      })
    },
    async editAuth (index, row) {
      this.formData = { id: row.id, auth: [] }
      await this.initAuth()
      await this.getUserAuth(row.id)
      this.setName('权限')
      this.setForm(authFormConf)
      this._changePageType(config.CMS.EDIT)
    },
    async initAuth () {
      const res = await Auth.getAllAuth()
      authFormConf[0].options = {}
      for (let item of res) {
        if (!Array.isArray(authFormConf[0].options[item.desc])) {
          authFormConf[0].options[item.desc] = []
        }
        authFormConf[0].options[item.desc].push({
          label: item.name,
          value: item.id
        })
      }
    },
    async getUserAuth (id) {
      const res = await this.model.getRoleAuth(id)
      for (let item of res) {
        this.formData.auth.push(item.id)
      }
    },
    toSubmit (e) {
      if (this.name === '分组') {
        this.changeInfo(e)
      } else {
        this.changeAuth(e)
      }
    },
    changeInfo (e) {
      try {
        this.model.changeRoleInfo(e).then(res => {
          this.$message.success('修改分组信息成功')
          this.getTable()
          this.toIndex()
        })
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    changeAuth (e) {
      if (e.auth.length === 0) {
        this.$message.error('请设置分组权限')
        return
      }
      this.model.editRoleAuth(e.id, e.auth).then(res => {
        this.$message.success('修改分组权限成功')
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
