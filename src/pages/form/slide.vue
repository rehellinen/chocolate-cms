<template lang="pug">
  .form
    choc-form.form-group(
      v-for="(item, index) in slideConf"
      :key="index"
      :title="item.label + '滑块'"
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
        initSlide: 50,
        disabledSlide2: 30
      },
      slideConf: [
        { name: 'defaultSlide', label: '默认', type: config.FORM.SLIDER },
        { name: 'initSlide', label: '自定义值', type: config.FORM.SLIDER },
        { name: 'disabledSlide1', label: '禁用', type: config.FORM.SLIDER, disabled: true },
        { name: 'disabledSlide2', label: '禁用', type: config.FORM.SLIDER, disabled: true },
        { name: 'tooltipSlide', label: 'tooltip', type: config.FORM.SLIDER, tooltip: true }
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
