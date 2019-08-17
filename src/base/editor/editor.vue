<template lang="pug">
  quill-editor(
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    @change="onEditorChange($event)"
  )
</template>

<script>
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
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">

</style>
