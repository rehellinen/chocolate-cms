<template lang="pug">
  .top-bar
    .logo
      i(
        @click="changeMenuCollapseStatus"
        :class="isMenuCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
      )
      span CHOCOLATE
    .operation
      message
      personal
      .close-all(@click="closeAll")
        i.el-icon-circle-close
    swiper.history(v-if="showHistory" :options="swiperOption")
      swiper-slide.tab(v-for="(item, index) in history" :key="item.path")
        router-link(
          :class="{ active: item.path === $route.path }"
          :to="item.path"
          tag="div"
        )
          span {{item.title}}
          i.el-icon-close(@click.stop="close(index)")
          .corner.left
            .shelter
          .corner.right
            .shelter
</template>

<script>
import Personal from '../personal/personal'
import Message from '../message/message'
import { mapGetters, mapActions } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  components: {
    Personal,
    Message,
    swiper,
    swiperSlide
  },
  data () {
    return {
      history: [],
      historyStorageKey: 'history',
      swiperOption: {
        slidesPerView: 'auto',
        initialSlide: 0,
        effect: 'slide',
        spaceBetween: 1,
        preventClicks: false,
        freeMode: true,
        mousewheel: {
          sensitivity: 1.5
        }
      }
    }
  },
  computed: {
    showHistory () {
      return this.history.length > 1 && this.plainMenus.length > 0
    },
    ...mapGetters(['getMenuByPath', 'isMenuCollapse', 'plainMenus'])
  },
  watch: {
    $route (newRoute) {
      if (this.history.some((item) => item.path === newRoute.path)) {
        return
      }
      const newHistory = this.getMenuByPath(newRoute.path)
      if (!newHistory) {
        return
      }
      this.history.push({
        path: newHistory.path,
        title: newHistory.title
      })
    }
  },
  created () {
    // 关闭窗口时保存history
    window.addEventListener('beforeunload', () => {
      this.saveTab()
    })
    this.init()
  },
  methods: {
    closeAll () {
      const item = this.history.find(route => this.$route.path === route.path)
      this.history = [item]
      this.saveTab()
    },
    init () {
      if (this.history.length === 0) {
        const storage = localStorage.getItem(this.historyStorageKey)
        if (storage) {
          this.history = JSON.parse(storage)
        }
      }
    },
    // 关闭其中一个Tab
    close (index) {
      if (this.$route.path === this.history[index].path) {
        if (this.history.length === 1) {
          this.$router.push('/')
        } else if (index === this.history.length - 1) {
          this.$router.push(this.history[index - 1].path)
        } else {
          this.$router.push(this.history[index + 1].path)
        }
      }
      this.history.splice(index, 1)
    },
    saveTab () {
      localStorage.setItem(this.historyStorageKey, JSON.stringify(this.history))
    },
    ...mapActions(['changeMenuCollapseStatus'])
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base.sass"

  .top-bar
    height: 80px
    display: flex
    flex-direction: column
    justify-content: center
    background-color: white
  .logo
    margin-left: 20px
    height: 50px
    display: flex
    align-items: center
    i
      font-size: 20px
      cursor: pointer
    span
      font-size: $normal-font-size
      margin-left: 10px
      letter-spacing: 3px
  .operation
    margin-right: 20px
    margin-top: 7px
    position: absolute
    right: 0
    top: 0
    height: 50px
    align-self: flex-start
    display: flex
    align-items: center

  .history
    width: 100%
    height: 30px
    display: flex
    overflow: hidden
    border-bottom: 2px solid $background-color
    .tab
      background-color: white
      color: $minor-font-color
      margin-right: 3px
      cursor: pointer
      width: 100px
      line-height: 30px
      text-align: center
      position: relative
      flex: none
      .corner
        display: none
        width: 8px
        height: 8px
        position: absolute
        background: $background-color
        bottom: 0
        z-index: 10
        .shelter
          width: 8px
          height: 8px
          background-color: white
        &.right
          right: 0
          margin-right: -8px
          .shelter
            border-bottom-left-radius: 100%
        &.left
          left: 0
          margin-left: -8px
          .shelter
            border-bottom-right-radius: 100%
      .active
        background: $background-color
        color: $minor-font-color
        border-radius: 5px 5px 0 0
        .corner
          display: block
      i
        position: absolute
        top: 3px
        right: 3px
  .close-all
    box-sizing: border-box
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    margin-top: 31px
    margin-left: 73px
    z-index: 100
    height: 30px
    width: 30px
    background-color: white
    border-left: 1px solid rgba(0, 0, 0, 0.10)
    cursor: pointer
    i
      font-size: $big-font-size
      color: $minor-font-color
      margin-top: 1px
  .de
</style>
