<template lang="pug">
div
  el-upload(
  action="#"
  list-type="picture-card"
  :auto-upload="false"
  :file-list="fileList"
  :disabled="disabled"
  :limit="limit"
  :on-change="handleChange"
  :on-exceed="handleExceed"
  :class="{'disabled': disabled}")
    i(slot="default" class="el-icon-plus")
    div(slot="file" slot-scope="{file}")
      img(
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      )
      span(class="el-upload-list__item-actions")
        span(
          class="el-upload-list__item-preview"
          @click="handlePreview(file)"
        )
          i(class="el-icon-zoom-in")
        span(
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleEdit(file)"
        )
          i(class="el-icon-edit")
        span(
          v-if="!disabled"
          @click="handleRemove(file)"
          class="el-upload-list__item-delete"
        )
          i(class="el-icon-delete")
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
    limit: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: []
    }
  },
  methods: {
    handleRemove (file) {
      let index = this.fileList.indexOf(file)
      console.log(this.fileList)
      this.fileList.splice(index, index + 1)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleEdit (file) {
      console.log(file)
    },
    handleExceed (file, fileList) {
      this.handleRemove(file)
    },
    handleChange (file, fileList) {
      this.fileList.push(file)
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

