<template lang="pug">
  div
    el-row(:gutter="20" style="margin-bottom: 30px")
      el-col(:md="6" :sm="12" v-for="(item, index) in data" :key="index")
        card(
        :title="item.title"
        :num="item.num"
        :text="item.text"
        :icon="iconConf[index]"
        :bgColor="colorConf[index]")
    el-row.progress(:gutter="20")
      el-col(:md="12" :sm="24")
        progress-bar(:data="progress")
      el-col(:md="12" :sm="24")
        progress-bar(:data="progress" type="circle")
</template>

<script>
import { cmsMixin, progressMixin } from '../../mixins'
import Card from '../../base/card/card'
import ProgressBar from '../../base/progress-bar/progress-bar'
import { Home as Model } from '../../model/Home'
import { colorConf, iconConf } from './config'

export default {
  components: {
    Card,
    ProgressBar
  },
  mixins: [cmsMixin, progressMixin],
  data () {
    return {
      colorConf: colorConf,
      iconConf: iconConf
    }
  },
  methods: {
    _initCMS () {
      this.setModel(new Model())
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
</style>
