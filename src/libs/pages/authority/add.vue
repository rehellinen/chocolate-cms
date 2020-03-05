<template lang="pug">
  .add
    my-form(
      :title="name"
      :config="form",
      :form-data="formData"
      @submit="toSubmit"
    )
</template>

<script>
import { formMixin, cmsMixin, breadMixin } from 'mixins'
import { userConf } from './config'
import { User as Model } from 'libs/model/User'
import { Role } from 'libs/model/Role'

export default {
  mixins: [cmsMixin, formMixin, breadMixin],
  data () {
    return {
      formData: {}
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
    toSubmit (e) {
      try {
        this.model.addUser(e).then(res => {
          this.$message.success('添加用户成功')
          this.toIndex()
        })
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .add
    @include card(10px, 10px)
</style>
