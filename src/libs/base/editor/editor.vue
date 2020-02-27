<template lang="pug">
  div
    quill-editor.ql-editor-class(
      v-model="content"
      :options="editorOption"
      ref="myQuillEditor"
      @change="onEditorChange($event)"
    )
    div(style="display:none")
      el-upload(
        :action="uploadUrl"
        :http-request="loadMedia"
        :show-file-list="false"
        accept="video/*,audio/*"
      )
        el-button.uploadBtn(size="small" type="primary") 上传
</template>

<script>
import { base64ToFile } from 'libs/utils/utils'
import { quillEditor, Quill } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { uploadFile } from 'libs/utils/http'
import config from 'config/index'

export default {
  components: {
    quillEditor
  },
  data () {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }], // custom button values
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
              [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
              [{ 'direction': 'rtl' }], // text direction
              [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['image'],
              ['media'] // 新添加的视频音频上传
            ],
            handlers: {
              'media' (value) { // 添加工具方法，即点击时模仿点击上传组件的按钮
                document.querySelector('.uploadBtn').click()
              }
            }
          }
        }
      },
      urls: [],
      // 服务器上传API
      uploadUrl: config.BASE_URL + '/file'
    }
  },
  watch: {
    content (newVal, oldVal) {
      if (newVal && newVal.includes('undefined')) {
        this.$refs.myQuillEditor.quill.scrollingContainer.innerHTML = oldVal
        this.content = oldVal
      }
    }
  },
  mounted () {
    this.initMediaButton() // 初始化图标，这样才能显示
    this.registerVideo()
    this.registerAudio()
  },
  methods: {
    onEditorChange (quill) {
      this.$emit('change', { content: this.content })
    },
    setContent (newContent) {
      this.content = newContent
    },
    async getContent () {
      let self = this
      let i = -1
      await this.upload()
      // 图片、视频和音频url替换
      return this.content.replace(/<img(.*?)>|<audio(.*?)>|<video(.*?)>/g, (media) => {
        return media.replace(/src="(.*?)"/g, (src) => {
          return 'src="' + self.urls[++i] + '"'
        })
      })
    },
    async upload () { // 上传图片、视频和音频
      this.content.replace(/<img(.*?)>|<audio(.*?)>|<video(.*?)>/g, (media) => {
        return media.replace(/src="(.*?)"/g, (src) => {
          this.urls.push(src.substring(5, src.length - 1))
        })
      })
      for (let i of Object.keys(this.urls)) {
        let file = base64ToFile(this.urls[i])
        if (!file) {
          continue
        }
        const { path } = await uploadFile({ file: file }, 'image')
        this.urls[i] = path
      }
    },
    initMediaButton () { // 初始化"Media"按钮样式
      const mediaButton = document.querySelector('.ql-media') // "ql-" 是插件自动加的前缀
      // 添加样式，使用fontawesome初始化图标的样式
      mediaButton.classList.add('el-icon-video-camera-solid')
      mediaButton.title = '视频音频上传'
    },
    loadMedia (param) { // 在富文本中显示视频和音频
      const reader = new FileReader()
      reader.readAsDataURL(param.file) // 将文件读取为 DataURL,也就是base64编码
      reader.onload = (ev) => { // 文件读取成功完成时触发
        let url = ev.target.result // 获得文件读取成功后的DataURL,也就是base64编码
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill
        let length = quill.getSelection().index // 获取光标所在位置
        let media = url.includes('video') ? 'video' : 'audio'
        // insertEmbed(index: Number(插入的位置), type: String(标签类型), value: any(参数，将传入到create的方法中去), source: String = 'api')
        quill.insertEmbed(length, media, { url: url }, 'api')
        quill.setSelection(length + 2) // 光标位置向后移动两位
      }
    },
    registerVideo () { // 注册quill的自定义标签—————视频标签
      let BlockEmbed = Quill.import('blots/block/embed')
      class VideoBlot extends BlockEmbed {
        static create (value) {
          let node = super.create()
          node.setAttribute('src', value.url) // 设置标签的src属性
          node.setAttribute('controls', true) // 设置标签的controls，否则他将不会显示
          node.setAttribute('width', '450px') // 设置大小
          node.setAttribute('height', '350px') // 设置大小
          return node
        }
      }
      VideoBlot.blotName = 'video'
      VideoBlot.tagName = 'video' // 自定义的标签为video
      Quill.register(VideoBlot)
    },
    registerAudio () { // 注册quill的自定义标签—————音频标签
      let BlockEmbed = Quill.import('blots/block/embed')
      class AudioBlot extends BlockEmbed {
        static create (value) {
          let node = super.create()
          node.setAttribute('src', value.url) // 设置标签的src属性
          node.setAttribute('controls', true) // 设置标签的controls，否则他将不会显示
          node.setAttribute('width', '300px') // 设置大小
          node.setAttribute('height', '100px') // 设置大小
          return node
        }
      }
      AudioBlot.blotName = 'audio'
      AudioBlot.tagName = 'audio' // 自定义的标签为audio
      Quill.register(AudioBlot)
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
