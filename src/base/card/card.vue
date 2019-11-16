<template lang="pug">
  .card(:style="{background: bgColor,color: color}")
    .card-title {{ title }}
    .card-content
      .text-content
        .num {{ num }}
        .text {{ text }}
      img(:src="url" v-if="!icon" :style="{width: width, height: height || width}")
      .icon-item
        i(:class="icon")
</template>

<script>
export default {
  props: {
    bgColor: { // 背景色
      type: String,
      default: '#ccc'
    },
    color: { // 文字颜色
      type: String,
      default: 'white'
    },
    title: { // 卡片标题内容
      type: String,
      default: null
    },
    num: { // 卡片数字内容
      type: String,
      default: null
    },
    text: { // 卡片文字内容
      type: String,
      default: null
    },
    url: { // 图片
      type: String,
      default: null
    },
    icon: { // 图标
      type: String,
      default: null
    },
    width: { // 图片宽度
      type: String,
      default: null
    },
    height: { // 图片
      type: String,
      default: null
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"
  .card
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
