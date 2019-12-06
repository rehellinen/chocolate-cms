<template lang="pug">
  div
    card(:data="data" :cardConf="cardConf")
    el-row(:gutter="20")
      el-col.card(:md="11" :sm="24")
        progress-bar(:data="progress")
      el-col.card(:md="12" :sm="24")
        progress-bar(:data="progress" type="circle")
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
      this.setModel(new Model())
      this.model.getMock().then(res => {
        this.data = res.data
        this.progress = res.progress
      })
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
</style>
