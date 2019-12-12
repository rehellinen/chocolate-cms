<template lang="pug">
  .upload-file
    el-row
      el-col(:span="3") 普通示例
      el-col(:span="21")
        upload-img
    el-row
      el-col(:span="3") 禁用示例
      el-col(:span="21")
        upload-img(:disabled="true")
    el-row
      el-col(:span="3") 动图检测
      el-col(:span="21")
        upload-img(:animatedCheck="true" @forbidAnimated="forbidAnimated")
    el-row
      el-col(:span="3") 限制4张
      el-col(:span="21")
        upload-img(:limit="4")
    el-row
      el-col(:span="3") 初始化+禁用
      el-col(:span="21")
        upload-img(:data="data" :disabled="true")
    el-row
      el-col(:span="3") 初始化+多选
      el-col(:span="21")
        upload-img(:data="data" :multiple="true")
    el-row
      el-col(:span="3") 初始化+多选+排序
      el-col(:span="21")
        upload-img(:data="data" :multiple="true" :sortable="true")
</template>

<script>
import { cmsMixin } from 'mixins'
import UploadImg from 'base/upload-file/upload-file'
import { Upload as Model } from 'model'

export default {
  components: {
    UploadImg
  },
  mixins: [ cmsMixin ],
  data () {
    return {
      data: []
    }
  },
  methods: {
    _initCMS () {
      this.setModel(Model)
      this.model.getMock().then(res => {
        this.data = res.data
      })
    },
    forbidAnimated () {
      alert('禁止上传动图')
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .upload-file
    @include card(20px, 25px)
  .el-row:not(:last-child)
    margin-bottom: 20px
</style>
