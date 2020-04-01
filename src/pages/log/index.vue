/* eslint-disable */
<template lang="pug">
  .log
    search(:searchConf="users" @search="toSearch")
    transition(name="fade")
      .search(v-if="keyword")
        .search-tip
          p 搜索"
          span.search-keyword {{ keyword }}
          p "，找到
          span.search-num {{ totalCount }}
          p 条日志信息
        button.search-back(@click="backInit") 返回全部日志
    .content
      article(v-loading="loading")
        section(v-for="log in logs" :key="log.id")
          p.brief {{ log }}
    el-divider
    .more
      span(v-show="!finished") 查看更多
      span.no(v-show="finished") {{  totalCount === 0 ? '暂无数据' : '没有更多数据了' }}
</template>

<script>
import { mapGetters } from 'vuex'
import Search from 'libs/base/search/search'

export default {
  components: {
    Search
  },
  data () {
    return {
      value: '',
      logs: ['user 2020.10.10-14:51 登录', 'user 2020.10.10-14:53 登录', 'user 2020.10.10-14.55 登录'],
      users: [],
      searchUser: '',
      loading: false,
      finished: true,
      keyword: 'user',
      more: false
    }
  },
  computed: {
    totalCount () {
      return this.logs.length
    },
    ...mapGetters(['auth', 'user'])
  },
  methods: {
    // 下拉搜索框
    toSearch (e) {
      this.searchUser = e.field
      this.keyword = e.searchStr
    },
    // 清空检索
    async backInit () {
      this.searchUser = ''
      this.keyword = ''
      this.logs = []
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"
  .log
    @include card(25px, 25px)
    .search
      height: 52px
      width: 100%
      background: $background-color
      display: flex
      flex-direction: row
      justify-content: space-between
      margin: 20px 0
      border-radius: 4px
      .search-tip
        display: flex
        flex-direction: row
        margin-left: 40px
        height: 52px
        line-height: 52px
        color: #354058
        font-size: 14px
        .search-keyword
          color: $theme-color
      .search-back
        margin: 8px 20px
        height: 32px
        background: $theme-color
        border: none
        border-radius: 4px
        color: #fff
        padding: 0 13px
        font-size: 14px
        cursor: pointer
    .content
      padding: 0 20px
      article
        .brief
          position: relative
          height: 25px
          line-height: 25px
          &:before
            content: ''
            width: 4px
            height: 4px
            background: black
            position: absolute
            left: -10px
            top: 50%
    .more
      font-size: 14px
      display: flex
      justify-content: center
      color: #909399
</style>
