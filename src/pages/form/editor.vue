<template lang="pug">
  .form
    choc-form.form-group(
      v-for="(item, index) in dateConf"
      :key="index"
      :title="item.label"
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
      formData: {},
      dateConf: [
        { name: 'content', label: '内容编辑器', type: config.FORM.EDITOR }
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
