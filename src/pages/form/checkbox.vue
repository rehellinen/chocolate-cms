<template lang="pug">
  .form
    choc-form.form-group(
      v-for="(item, index) in checkBoxConf"
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
      formData: {
        checkbox: [1],
        checkboxGroup: [1]
      },
      checkBoxConf: [
        {
          name: 'checkbox',
          label: '多选框',
          type: config.FORM.CHECKBOX,
          options: {
            '0': [
              {
                label: '苹果',
                value: 1
              },
              {
                label: '香蕉',
                value: 2
              }
            ]
          }
        },
        {
          name: 'checkboxGroup',
          label: '多选框组',
          type: config.FORM.CHECKBOX,
          group: true,
          options: {
            '水果': [
              {
                label: '苹果',
                value: 1
              },
              {
                label: '香蕉',
                value: 2
              }
            ],
            '颜色': [
              {
                label: '红色',
                value: 3
              },
              {
                label: '黄色',
                value: 4
              }
            ]
          }
        }
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
