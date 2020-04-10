<template lang="pug">
el-row(:gutter="20" style="margin-bottom: 20px")
  el-col(:md="6" :sm="12" v-for="(item, index) in data" :key="index")
    .card(:style="{background: cardConf[index].color, color: 'white', margin: '5px 0'}")
      .card__title {{ item.title }}
      .card__content
        .text
          .text__num {{ item.num }}
          .text__content {{ item.text }}
        img(:src="item.url" v-if="!item.icon" :style="{width: item.width, height: item.height || item.width}")
        .icon-item
          i(:class="cardConf[index].icon")
</template>

<script>
export default {
  name: 'ChocCard',
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
    .card__title
      font-size: $big-font-size
      font-weight: bold
    .card__content
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      .text
        display: flex
        flex-direction: column
        margin-right: 20px
        .text__num
          font-size: 30px
          margin-bottom: 10px
      .icon-item
        font-size: 3rem
</style>
