<template lang="pug">
  div.form-container
    p.title {{title}}
    el-form(ref="data" :model="formData" label-width="100px")
      el-form-item(
        v-for="(conf, index) in config"
        :label="conf.label + '：'"
        :key="index"
      )
        el-input(
          v-if="!conf.type || conf.type === inputType.INPUT"
          v-model="formData[conf.name]"
        )

        el-switch(
          v-if="conf.type === inputType.SWITCH"
          v-model="conf.value"
          active-color="#66b1ff"
          inactive-color="#ccc"
        )

        el-slider(
          v-if="conf.type === inputType.SLIDER"
          v-model="conf.value"
          :show-tooltip="conf.tooltip || true"
        )

        el-select(
          v-if="conf.type === inputType.SELECT"
          v-model="formData[conf.name]"
        )
          el-option(
            v-for="(item, i) in conf.options"
            :label="item.label"
            :value="item.value"
            :key="i"
          )

        my-editor.editor(
          ref="editor"
          v-if="conf.type === inputType.EDITOR",
          :data-name="conf.name"
          @change="editorChange"
        )

        my-file-uploader(
          ref="image"
          v-if="conf.type === inputType.FILE",
          :data-name="conf.name"
          :initialVal="formData[conf.name]"
          @uploaded="imageUploaded"
        )

        el-input(
          v-if="conf.type === inputType.DISABLED"
          v-model="formData[conf.name]"
          disabled
        )

        el-date-picker(
          v-if="conf.type === inputType.DATE"
          v-model="formData[conf.name]"
          type="datetime"
          placeholder="请选择日期和时间"
          value-format="timestamp"
        )
      el-form-item
        el-button(@click="onSubmit") {{buttonText}}
</template>

<script>
import config from 'config'
import MyEditor from 'base/editor/editor'
import MyFileUploader from 'base/file-uploader/file-uploader'

export default {
  components: {
    MyEditor,
    MyFileUploader
  },
  props: {
    config: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: '提交'
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      inputType: config.FORM,
      checkIndex: 0
    }
  },
  mounted () {
    for (let conf of this.config) {
      if (conf.type === config.FORM.EDITOR) {
        this.$refs.editor[0].setContent(this.formData[conf.name])
      }
      if (conf.type === config.FORM.FILE) {
        this.$refs.image[0].setFileUrl(this.formData[conf.name])
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.$refs.editor) {
        const name = this.$refs.editor[0].$attrs['data-name']
        this.formData[name] = await this.$refs.editor[0].getContent()
      }
      this.$emit('submit', this.formData)
    },
    editorChange (e) {
      const name = this.$refs.editor[0].$attrs['data-name']
      console.log(e.content)
      this.formData[name] = e.content
    },
    imageUploaded (e) {
      const name = this.$refs.image[0].$attrs['data-name']
      this.formData[name] = e.path
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .form-container
    .title
      color: $main-font-color
      font-size: $vast-font-size
      font-weight: bold
      margin: 20px 0 20px 80px
    .editor
      max-width: 500px
    .el-date-picker
      max-width: 100%
    .el-input
      max-width: 400px
    .el-slider
      max-width: 500px
</style>