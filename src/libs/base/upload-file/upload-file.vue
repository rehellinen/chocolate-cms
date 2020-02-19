<template lang="pug">
div
  el-upload(
  action="#"
  list-type="picture-card"
  :auto-upload="false"
  :file-list="fileList"
  :disabled="disabled || exceed"
  :limit="limit"
  :multiple="multiple"
  :on-change="handleChange"
  :on-exceed="handleExceed"
  :class="{'disabled': disabled || exceed}")
    i(slot="default" class="el-icon-plus")
    div(slot="file" slot-scope="{file}")
      img(
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      )
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
export default {
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
      default: null
    },
    sortable: {
      type: Boolean,
      default: false
    },
    animatedCheck: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      exceed: false
    }
  },
  watch: {
    data () {
      this.fileList = this.data
    }
  },
  methods: {
    handleRemove (file) {
      let index = this.fileList.indexOf(file)
      this.fileList.splice(index, index + 1)
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed (file, fileList) {
      this.exceed = true
      this.handleRemove(file)
    },
    handleChange (file, fileList) {
      this.fileList.push(file)
      if (this.limit && this.fileList.length === this.limit) {
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
</style>

