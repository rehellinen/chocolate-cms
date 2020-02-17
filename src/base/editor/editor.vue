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
import { base64ToFile } from 'utils/utils'
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
      imgUrls: [],
      mediaUrls: [],
      // 服务器上传API
      uploadUrl: config.BASE_URL + '/file',
      isVideo: true
    }
  },
  watch: {
    content (newVal, oldVal) {
      if (newVal.includes('undefined')) {
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
      await this.uploadImg()
      await this.uploadMedia()
      // 图片url替换
      this.content = this.content.replace(/<img(.*?)>/g, (img) => {
        return img.replace(/src="(.*?)"/g, (src) => {
          return 'src="' + self.imgUrls[++i] + '"'
        })
      })
      i = -1
      // 音频视频url替换
      this.content = this.content.replace(/<video(.*?)>|<audio(.*?)>/g, (video) => {
        return video.replace(/src="(.*?)"/g, (src) => {
          if (src.includes('http://') || src.includes('https://')) {
            return src
          }
          return 'src="' + self.mediaUrls[++i] + '"'
        })
      })
      return this.content
    },
    async uploadImg () {
      this.content.replace(/<img(.*?)>/g, (img) => {
        return img.replace(/src="(.*?)"/g, (src) => {
          this.imgUrls.push(src.substring(5, src.length - 1))
        })
      })
      for (let i of Object.keys(this.imgUrls)) {
        let file = base64ToFile(this.imgUrls[i], 'jpg')
        if (!file) {
          continue
        }
        let formData = new FormData()
        formData.append('file', file)
        const { path } = await uploadFile(formData, 'image')
        this.imgUrls[i] = path
      }
    },
    async uploadMedia () { // 上传视频和音频
      for (let i of Object.keys(this.mediaUrls)) {
        let formData = new FormData()
        formData.append('file', this.mediaUrls[i])
        const { path } = await uploadFile(formData, 'image')
        this.mediaUrls[i] = path
      }
    },
    initMediaButton () { // 初始化"Media"按钮样式
      const mediaButton = document.querySelector('.ql-media') // "ql-" 是插件自动加的前缀
      // 添加样式，使用fontawesome初始化图标的样式
      mediaButton.classList.add('el-icon-video-camera-solid')
      mediaButton.title = '视频音频上传'
    },
    loadMedia (param) { // 在富文本中显示视频和音频
      this.isVideo = param.file.name.match(/\.(mp4|avi|rmvb|rm|flv|3gp)(\?.*)?$/)
      let url = URL.createObjectURL(param.file)
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill
      let length = quill.getSelection().index // 获取光标所在位置
      let media = this.isVideo ? 'video' : 'audio'
      // insertEmbed(index: Number(插入的位置), type: String(标签类型), value: any(参数，将传入到create的方法中去), source: String = 'api')
      quill.insertEmbed(length, media, { url: url }, 'api')
      quill.setSelection(length + 1) // 光标位置向后移动一位
      this.mediaUrls.push(param.file)
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
          node.setAttribute('id', 'video') // 设置一个id
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
          node.setAttribute('id', 'audio') // 设置一个id
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
