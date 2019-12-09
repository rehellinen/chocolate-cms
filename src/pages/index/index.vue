<template lang="pug">
  div
    el-row(:gutter="20" style="margin-bottom: 30px")
      el-col(:md="6" :sm="12" v-for="(item, index) in data" :key="index")
        card(
          :title="item.title"
          :num="item.num"
          :text="item.text"
          :icon="cardConf[index].icon"
          :bgColor="cardConf[index].color"
        )
    el-row.progress(:gutter="20")
      el-col(:md="12" :sm="24")
        progress-bar(:data="progress")
      el-col(:md="12" :sm="24")
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
      this.setModel(Model)
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
