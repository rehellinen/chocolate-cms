<template lang="pug">
  .add
    choc-form(
      :title="name"
      :config="form",
      :form-data="formData"
      :rules="rules"
      @submit="toSubmit"
    )
</template>

<script>
import { userConf, UserRules } from './config'
import { User as Model } from 'libs/model/User'
import { Role } from 'libs/model/Role'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      rules: UserRules
    }
  },
  methods: {
    async _initCMS () {
      this.setModel(Model)
      this.setName('添加用户')
      const form = await this.getUserFormConf()
      this.setForm(form)
    },
    async getUserFormConf () {
      const res = await Role.getAllRole()
      userConf[4].options = []
      for (let item of res.data) {
        userConf[4].options.push({
          label: item.name,
          value: item.id
        })
      }
      return userConf
    },
    async toSubmit (e) {
      await this.model.addUser(e)
      this.$message.success('添加用户成功')
      this.toIndex()
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
