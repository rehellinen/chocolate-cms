<template lang="pug">
  quill-editor.ql-editor-class(
    v-model="content"
    :options="editorOption"
    ref="myQuillEditor"
    @change="onEditorChange($event)"
  )
</template>

<script>
import { base64ToFile } from 'utils/utils'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { uploadImg } from 'libs/utils/http'

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
    getContent () {
      let self = this
      return this.content.replace(/<img(.*?)>/g, function (img) {
        return img.replace(/src="(.*?)"/g, function (src) {
          src = src.substring(5, src.length - 1)
          return self.uploadImg(src)
        })
      })
    },
    uploadImg (src) {
      let file = base64ToFile(src, (new Date()).getTime() + '.jpeg')
      let formData = new FormData()
      formData.append('file', file)
      uploadImg(formData).then(res => {
        console.log(res)
      })
      return '123'
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
