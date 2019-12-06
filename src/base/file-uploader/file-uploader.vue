<template lang="pug">
  div.upload
    el-upload(
      :action="uploadUrl"
      name="file"
      list-type="picture"
      :headers="header"
      :show-file-list="false"
      :on-success="uploadSuccess",
      :on-error="uploadError"
      v-if="radioType === 1"
    )
      el-button(size="small" type="primary") 点击上传
    el-input(
      v-model="customFileUrl"
      v-if="radioType === 2"
      @blur="setCustom"
    )
    img(v-if="isPhoto && fileUrl" :src="fileUrl")
    video(v-if="isVideo && fileUrl" width="500" height="300" controls)
      source(:src="fileUrl")
    div
      el-radio(v-model="radioType" :label="1") 上传文件
      el-radio(v-model="radioType" :label="2") 输入地址
</template>

<script>
import config from 'config'
import { Token } from 'libs/class/Token'

export default {
  data () {
    return {
      radioType: 1,
      fileUrl: '',
      fileName: '',
      customFileUrl: '',
      // 服务器上传API
      uploadUrl: config.BASE_URL + '/file',
      // http请求发送的额外头信息
      header: {
        token: new Token().getTokenFromCache()
      }
    }
  },
  computed: {
    isPhoto () {
      if (!this.fileName) return false
      return this.fileName.match(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    },
    isVideo () {
      if (!this.fileName) return false
      return this.fileName.match(/\.(mp4|avi|rmvb|rm|flv|3gp)(\?.*)?$/)
    }
  },
  methods: {
    setFileUrl (url) {
      this.fileUrl = url
      this.fileName = url
    },
    uploadSuccess (response, file, fileList) {
      this.fileUrl = file.url
      this.fileName = file.name
      this.$emit('uploaded', response.data)
    },
    setCustom () {
      this.fileUrl = this.customFileUrl
      this.fileName = this.customFileUrl
      this.$emit('uploaded', { path: this.customFileUrl })
    },
    uploadError (err, file, fileList) {
      console.log(err)
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"
  .success
    display: flex
    align-items: center
    i
      margin-right: 10px
  .upload
    position: relative
    display: flex
    flex-direction: column
    img
      max-width: 200px
      margin-top: 10px
    input
      position: absolute
      left: 0
      top: 0
      opacity: 0
      -ms-filter: 'alpha(opacity=0)'
      height: 40px
    .upload-button
      border-radius: 5px
      background-color: $theme-color
      color: white
      padding: 5px 0
      margin-top: 5px
      font-size: 10px
      width: 80px
      letter-spacing: 1px
      height: 15px
      display: flex
      justify-content: center
      align-items: center
</style>
