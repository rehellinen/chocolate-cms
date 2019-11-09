<template lang="pug">
  div
    .card-list
      card(v-for="(item, index) in data" :key="index"
      :title="item.title"
      :num="item.num"
      :text="item.text"
      :icon="iconConf[index]"
      :bgColor="colorConf[index]")
    .progress
      progress-bar(:data="progress")
      progress-bar(:data="progress" type="circle")
</template>

<script>
import { cmsMixin } from '../../mixins'
import Card from '../../base/card/card'
import ProgressBar from '../../base/progress-bar/progress-bar'
import { Home as Model } from '../../model/Home'
import { colorConf, iconConf } from './config'

export default {
  components: {
    Card,
    ProgressBar
  },
  mixins: [cmsMixin],
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
  .card-list
    display: flex
    flex-direction: row
    justify-content: space-around
  .progress
    display: flex
    flex-direction: column
    width: 60%
</style>
