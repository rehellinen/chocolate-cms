<template lang="pug">
div.file-uploader
  el-upload(
    :action="uploadUrl"
    name="file"
    :list-type="limit === 1 ? 'text' : 'picture-card'"
    :show-file-list="limit !== 1"
    :file-list="limit !== 1 ? fileList : []"
    :disabled="disabled || exceed"
    :limit="limit"
    :multiple="multiple"
    :accept="accept"
    :on-success="handleSuccess"
    :on-exceed="handleExceed"
    :on-error="uploadError"
    :class="{'disabled': disabled || exceed, 'avatar-uploader' : fileList.length === 1}")
    img(v-if="limit === 1 && fileList.length !== 0" :src="fileList[0].url" class="avatar")
    i(v-if="limit === 1 && fileList.length === 0" class="el-icon-plus avatar-uploader-icon")
    i(v-if="!limit || limit !== 1" class="el-icon-plus")
    div(v-if="!limit || limit !== 1" slot="file" slot-scope="{file}" style="height: 100%; width: 100%")
      img(class="el-upload-list__item-thumbnail" :src="file.url" alt="")
      span(class="el-upload-list__item-actions")
        span(
          v-if="sortable"
          class="el-upload-list__item-preview"
          @click="handleUp(file)"
          )
          i(class="el-icon-back")
        span(
          class="el-upload-list__item-preview"
          @click="handlePreview(file)"
        )
          i(class="el-icon-zoom-in")
        span(
          v-if="!disabled"
          @click="handleRemove(file)"
          class="el-upload-list__item-delete"
        )
          i(class="el-icon-delete")
        span(
          v-if="sortable"
          class="el-upload-list__item-preview"
          @click="handleDown(file)"
          )
          i(class="el-icon-right")
  el-dialog(:visible.sync="dialogVisible")
    img(width="100%" :src="dialogImageUrl" alt="")
</template>

<script>
import config from 'config/index'

export default {
  name: 'ChocFileUploader',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: null
    },
    data: {
      type: Array,
      default: () => []
    },
    sortable: {
      type: Boolean,
      default: false
    },
    animatedCheck: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      fileUrl: [],
      exceed: false,
      // 服务器上传API
      uploadUrl: config.BASE_URL + '/files/image',
      // http请求发送的额外头信息
      header: {
        token: ''
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler () {
        this.fileList = this.data
        this.checkLimit()
      }
    }
  },
  methods: {
    getUrl () {
      this.fileUrl = []
      for (let item of this.fileList) {
        this.fileUrl.push(item.url)
      }
      return this.limit === 1 ? (this.fileUrl[0] || '') : this.fileUrl
    },
    checkLimit () {
      if (this.limit && this.limit !== 1 && this.fileList.length >= this.limit) {
        this.exceed = true
        if (this.fileList.length > this.limit) {
          this.fileList.splice(this.limit, this.fileList.length)
        }
      } else {
        this.exceed = false
      }
    },
    handleRemove (file) {
      let index = this.fileList.indexOf(file)
      if (index !== -1) {
        this.fileList.splice(index, index + 1)
      }
      this.exceed = false
      this.checkLimit()
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed (file, fileList) {
      if (this.limit !== 1) this.exceed = true
    },
    handleSuccess (response, file, fileList) {
      this.fileList = fileList
      if (this.limit === 1) {
        this.fileList[0].url = response.data.path
      }
      if (this.limit && this.limit !== 1 && this.fileList.length === this.limit) {
        this.exceed = true
      }
      if (this.animatedCheck && file.name.substring(file.name.lastIndexOf('.'), file.name.length).toLowerCase() === '.gif') {
        this.fileList.splice(this.fileList.length - 1, this.fileList.length)
        this.handleForbidAnimated()
      }
    },
    handleUp (file) {
      let index = this.fileList.indexOf(file)
      if (index === 0) {
        return
      }
      let newFileList = this.fileList
      let changeFile = newFileList[index - 1]
      newFileList[index - 1] = file
      newFileList[index] = changeFile
      this.fileList = []
      for (let x of newFileList) {
        this.fileList.push(x)
      }
    },
    handleDown (file) {
      let index = this.fileList.indexOf(file)
      if (index === this.fileList.length - 1) {
        return
      }
      let newFileList = this.fileList
      let changeFile = newFileList[index + 1]
      newFileList[index + 1] = file
      newFileList[index] = changeFile
      this.fileList = []
      for (let x of newFileList) {
        this.fileList.push(x)
      }
    },
    handleForbidAnimated () {
      this.$emit('forbidAnimated')
    },
    uploadError (err, file, fileList) {
      console.log(err)
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .disabled
    /deep/ .el-upload
      cursor: not-allowed
    /deep/ .el-upload--picture-card:hover, .el-upload:focus
      border: 1px dashed #c0ccda
  .avatar-uploader
    /deep/ .el-upload
      border: 1px dashed #d9d9d9
      border-radius: 6px
      cursor: pointer
      position: relative
      overflow: hidden
  .avatar-uploader .el-upload:hover
    border-color: #409EFF
  .avatar-uploader-icon
    background-color: #fbfdff
    border: 1px dashed #c0ccda
    border-radius: 6px
    font-size: 28px
    color: #8c939d
    width: 148px
    height: 148px
    line-height: 148px
    text-align: center
  .avatar
    width: 148px
    height: 148px
    display: block
</style>

