<template lang="pug">
  el-dialog(
    :title="title"
    :visible.sync="visible"
    :close-on-click-modal="false",
    :close-on-press-escape="false",
    :show-close="false"
    width="30%"
  )
    span {{content}}
    span(slot="footer" class="dialog-footer")
      el-button(@click="toCancel" v-if="cancel") 取消
      el-button(@click="toConfirm" type="danger") {{button}}
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
    cancel: {
      type: Boolean,
      default: false
    },
    cb: {
      type: Function,
      default: () => () => {}
    }
  },
  methods: {
    toConfirm () {
      this.closeDialog()
      this.$emit('confirm')
      this.cb && this.cb()
    },
    toCancel () {
      this.closeDialog()
      this.$emit('cancel')
    },
    showCancel () {
      this.cancel = true
    },
    hideCancel () {
      this.cancel = false
    },
    closeDialog () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
