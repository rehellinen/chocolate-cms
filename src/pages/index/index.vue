<template lang="pug">
  div
    choc-card(:data="data" :cardConf="cardConf")
    el-row(:gutter="20")
      el-col(:md="12" :sm="24")
        choc-progress-bar.card(:data="progress")
      el-col(:md="12" :sm="24")
        choc-progress-bar.card(:data="progress" type="circle")
</template>

<script>
import { Home as Model } from 'model/Home'
import { cmsMixin } from 'mixins'

export default {
  mixins: [cmsMixin],
  data () {
    return {
      cardConf: [
        { color: 'linear-gradient(230deg, #759bff, #843cf6)', icon: 'el-icon-goods' },
        { color: 'linear-gradient(230deg, #fc5286, #fbaaa2)', icon: 'el-icon-star-off' },
        { color: 'linear-gradient(230deg, #ffc480, #ff763b)', icon: 'el-icon-user' },
        { color: 'linear-gradient(230deg, #0e4cfd, #6a8eff)', icon: 'el-icon-bell' }
      ],
      data: [],
      progress: []
    }
  },
  methods: {
    async _initCMS () {
      this.setModel(Model)
      this.data = await this.model.getCount()
      this.progress = await this.model.getProgress()
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .card
    @include card(15px, 10px)
  .el-col
    margin-bottom: 10px
</style>
