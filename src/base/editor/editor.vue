<template lang="pug">
  quill-editor.ql-editor-class(
    v-model="content"
    :options="editorOption"
    ref="myQuillEditor"
    @change="onEditorChange($event)"
  )
</template>

<script>
import { base64ToBlob } from 'utils/utils'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      content: '',
      editorOption: {
      }
    }
  },
  methods: {
    onEditorChange (quill) {
      this.$emit('change', { content: this.content })
    },
    setContent (newContent) {
      this.content = newContent
    },
    uploadImg () {
      return this.content.replace(/<img(.*?)>/g, function (img) {
        return img.replace(/src="(.*?)"/g, function (src) {
          src = src.substring(5, src.length - 1)
          // 在此处上传base64ToBlob(match1)，返回url
          return base64ToBlob(src) + '123'
        })
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .quill-editor
    line-height: 1.42
    /deep/ .ql-editor
      min-height: 100px
</style>
