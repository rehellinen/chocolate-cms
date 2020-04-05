<template lang="pug">
  .upload-file
    el-row
      el-col(:span="3") 普通示例
      el-col(:span="21")
        choc-file-uploader
    el-row
      el-col(:span="3") 禁用示例
      el-col(:span="21")
        choc-file-uploader(:disabled="true")
    el-row
      el-col(:span="3") 动图检测
      el-col(:span="21")
        choc-file-uploader(:animatedCheck="true" @forbidAnimated="forbidAnimated")
    el-row
      el-col(:span="3") 限制4张
      el-col(:span="21")
        choc-file-uploader(:limit="4")
    el-row
      el-col(:span="3") 初始化+禁用
      el-col(:span="21")
        choc-file-uploader(:data="data" :disabled="true")
    el-row
      el-col(:span="3") 初始化+多选
      el-col(:span="21")
        choc-file-uploader(:data="data" :multiple="true")
    el-row
      el-col(:span="3") 初始化+多选+排序
      el-col(:span="21")
        choc-file-uploader(:data="data" :multiple="true" :sortable="true")
</template>

<script>
import { Upload as Model } from 'model'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      data: []
    }
  },
  methods: {
    async _initCMS () {
      this.setModel(Model)
      this.data = await this.model.getImage()
    },
    forbidAnimated () {
      alert('禁止上传动图')
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base.sass"

  .upload-file
    @include card(20px, 25px)
  .el-row:not(:last-child)
    margin-bottom: 20px
</style>
