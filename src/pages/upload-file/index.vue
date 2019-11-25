<template lang="pug">
  .card
    el-row
      el-col(:span="3") 普通示例
      el-col(:span="21")
        upload-img
    el-row
      el-col(:span="3") 禁用示例
      el-col(:span="21")
        upload-img(:disabled="true")
    el-row
      el-col(:span="3") 限制4张
      el-col(:span="21")
        upload-img(:limit="4")
    el-row
      el-col(:span="3") 禁用加初始化
      el-col(:span="21")
        upload-img(:limit="4")
</template>

<script>
import UploadImg from 'base/upload-file/upload-file'

export default {
  components: {
    UploadImg
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .el-row
    margin-bottom: 20px
  .card
    margin: 20px
</style>
