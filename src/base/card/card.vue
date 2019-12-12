<template lang="pug">
el-row(:gutter="20" style="margin-bottom: 30px")
  el-col(:md="6" :sm="12" v-for="(item, index) in data" :key="index")
    .card(:style="{background: cardConf[index].color, color: 'white'}")
      .card-title {{ item.title }}
      .card-content
        .text-content
          .num {{ item.num }}
          .text {{ item.text }}
        img(:src="item.url" v-if="!item.icon" :style="{width: item.width, height: item.height || item.width}")
        .icon-item
          i(:class="cardConf[index].icon")
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    cardConf: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .card
    @include card(20px, 25px)
    flex-grow: 1
    flex-shrink: 1
    flex-basis: auto
    .card-title
      font-size: $big-font-size
      font-weight: bold
    .card-content
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .text-content
        display: flex
        flex-direction: column
        margin-right: 20px
        .num
          font-size: 30px
          margin-bottom: 10px
      .icon-item
        font-size: 3rem
</style>
