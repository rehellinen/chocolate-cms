<template lang="pug">
  div
    choc-dialog(:visible="visible"
      :title="title"
      :content="content"
      :cb="cb"
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
        :operate="operate"
        :pageConf="pageConf"
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
import { userTableConf, userFormConf, searchConf, passwordFormConf, UserRules, passwordRules } from './config'
import { User as Model } from 'libs/model/User'
import { Role } from 'libs/model/Role'
import config from 'config/index'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      operate: [{
        type: 'primary',
        name: '修改密码',
        func: this.editPassword
      }],
      rules: UserRules
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
    async getTable () {
      const res = await this.model.getAllUser()
      this.table = res.data
      this.setPage(res)
      this.loading = false
    },
    editPassword (index, row) {
      this.formData = { id: row.id }
      this.setName('密码')
      this.setForm(passwordFormConf)
      this.rules = passwordRules
      this._changePageType(config.CMS.EDIT)
    },
    toSubmit (e) {
      if (this.name === '用户') {
        this.changeInfo(e)
      } else {
        this.changePassword(e)
      }
    },
    async changeInfo (e) {
      await this.model.changeUserInfo(e)
      this.$message.success('修改用户信息成功')
      this.getTable()
      this.toIndex()
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
