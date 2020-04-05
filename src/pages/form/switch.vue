<template lang="pug">
  .form
    choc-form.form-group(
      v-for="(item, index) in switchConf"
      :key="index"
      :title="item.label + '开关'"
      :config="[item]"
      :form-data="formData"
      :ifSubmit="false"
    )
</template>

<script>
import config from 'config/index'

export default {
  data () {
    return {
      formData: {
        disabledSwitch2: true
      },
      switchConf: [
        { name: 'defaultSwitch', label: '默认', type: config.FORM.SWITCH },
        { name: 'redSwitch', label: '蓝色', type: config.FORM.SWITCH, color: '#66b1ff' },
        { name: 'disabledSwitch1', label: '禁用', type: config.FORM.SWITCH, disabled: true },
        { name: 'disabledSwitch2', label: '禁用', type: config.FORM.SWITCH, disabled: true }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .form-group
    @include card(10px, 10px)
    margin-bottom: 20px
</style>
