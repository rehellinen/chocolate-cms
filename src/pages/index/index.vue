<template lang="pug">
  div
    card(:data="data" :cardConf="cardConf")
    el-row(:gutter="20")
      el-col(:md="12" :sm="24")
        progress-bar.card(:data="progress")
      el-col(:md="12" :sm="24")
        progress-bar.card(:data="progress" type="circle")
</template>

<script>
import { cmsMixin } from 'mixins'
import Card from 'base/card/card'
import ProgressBar from 'base/progress-bar/progress-bar'
import { Home as Model } from 'model/Home'
import { cardConf } from './config'

export default {
  components: {
    Card,
    ProgressBar
  },
  mixins: [cmsMixin],
  data () {
    return {
      cardConf: cardConf,
      data: [],
      progress: []
    }
  },
  methods: {
    _initCMS () {
      this.setModel(Model)
      this.model.getCount().then(res => {
        this.data = res
      })
      this.model.getProgress().then(res => {
        this.progress = res
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base"

  .card
    @include card(15px, 10px)
</style>
