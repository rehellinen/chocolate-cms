<template lang="pug">
  .form
    choc-form.form-group(
      v-for="(item, index) in inputConf"
      :key="index"
      :title="item.label + '输入框'"
      :config="[item]"
      :form-data="formData"
      :ifSubmit="false"
    )
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      inputConf: [
        { name: 'input', label: '默认' },
        { name: 'disabled', label: '禁用', disabled: true }
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
