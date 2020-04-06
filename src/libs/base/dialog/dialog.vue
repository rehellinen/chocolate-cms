<template lang="pug">
  el-dialog(
    :title="title"
    :visible="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="showClose"
    :width="width"
    @close="toCancel"
  )
    slot
      span {{content}}
    span(
      v-if="showFooter"
      slot="footer"
      class="dialog-footer"
    )
      el-button(@click="toCancel" v-if="showCancel" size="small") 取消
      el-button(@click="toConfirm" type="danger" size="small") {{button}}
</template>

<script>
export default {
  name: 'ChocDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: '确定'
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '30%'
    },
    cb: {
      type: Function,
      default: () => () => {}
    }
  },
  methods: {
    toConfirm () {
      this.closeDialog()
      this.cb && this.cb()
    },
    toCancel () {
      this.closeDialog()
    },
    closeDialog () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  /deep/ .el-dialog
    border-radius: $border-radius
    overflow: hidden
    min-width: 250px
  /deep/ .el-dialog__header
    padding: 15px 20px 10px 20px
    background-color: $theme-color
    border-bottom: 0 !important
    .el-dialog__close
      color: white
      &:hover
        color: black
    .el-dialog__title
      font-size: 18px
      color: white
  /deep/ .el-dialog__body
    padding: 15px 20px
  /deep/ .el-dialog__footer
    padding: 10px 20px 15px 20px
</style>
