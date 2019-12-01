<template lang="pug">
  .scroll-top(
    @click="toTop"
    :class="{ show: isShow }"
    )
    i.el-icon-top
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      target: null
    }
  },
  mounted () {
    window.addEventListener('scroll', (e) => {
      this.isShow = e.target.scrollTop > 50
      this.target = e.target
    }, true)
  },
  methods: {
    toTop () {
      if (!this.isShow || !this.target) {
        return
      }
      const animation = () => {
        const now = this.target.scrollTop
        if (now > 0) {
          this.target.scrollTop = now - now / 10
          timer = requestAnimationFrame(animation)
        } else {
          cancelAnimationFrame(timer)
        }
      }
      let timer = requestAnimationFrame(animation)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .scroll-top
    position: fixed
    bottom: 20px
    right: 20px
    width: 30px
    height: 30px
    text-align: center
    border-radius: 50%
    background: $yellow-orange
    opacity: 0
    transition: opacity 0.25s
    &.show
      cursor: pointer
      opacity: 0.7
      &:hover
        opacity: 1
    i
      color: white
      line-height: 30px
      font-size: 20px
</style>
