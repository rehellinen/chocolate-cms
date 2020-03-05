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
        :pageConf="pageConf"
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
import { userTableConf, userFormConf, searchConf, passwordFormConf } from './config'
import { User as Model } from 'libs/model/User'
import { Role } from 'libs/model/Role'
import config from 'config/index'

export default {
  mixins: [cmsMixin, dialogMixin, tableMixin, formMixin, breadMixin],
  data () {
    return {
      operate: [{
        type: 'primary',
        name: '修改密码',
        func: this.editPassword
      }]
    }
  },
  methods: {
    async _initCMS () {
      this.setModel(Model)
      this.setName('用户')
      const form = await this.getUserFormConf()
      this.setForm(form)
      this.setTable(userTableConf)
      this.setSearch(searchConf)
    },
    async getUserFormConf () {
      const res = await Role.getAllRole()
      userFormConf[3].options = []
      for (let item of res.data) {
        userFormConf[3].options.push({
          label: item.name,
          value: item.id
        })
      }
      return userFormConf
    },
    getTable () {
      this.model.getAllUser().then(res => {
        this.table = res.data
        this.setPage(res)
        this.loading = false
      })
    },
    editPassword (index, row) {
      this.formData = { id: row.id }
      this.setName('密码')
      this.setForm(passwordFormConf)
      this._changePageType(config.CMS.EDIT)
    },
    toSubmit (e) {
      if (this.name === '用户') {
        this.changeInfo(e)
      } else {
        this.changePassword(e)
      }
    },
    changeInfo (e) {
      try {
        this.model.changeUserInfo(e).then(res => {
          this.$message.success('修改用户信息成功')
          this.getTable()
          this.toIndex()
        })
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    changePassword (e) {
      if (e.newPassword !== e.newPassword1) {
        this.$message.error('两次新密码不一致')
        return
      }
      this.model.changeUserPw(e.id, e.newPassword).then(res => {
        this.$message.success(res.message)
        this.getTable()
        this.toIndex()
      })
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
