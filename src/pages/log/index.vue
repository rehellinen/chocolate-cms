/* eslint-disable */
<template lang="pug">
  .log
    search(:searchConf="users")
    transition(name="fade")
      .search(v-if="keyword")
        .search-tip
          p 搜索“
          span.search-keyword {{ keyword }}
          p ”，找到
          span.search-num {{ totalCount  }}
          p 条日志信息
        button.search-back(@click="backInit") 返回全部日志
    .content

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
      log: null,
      value: '',
      logs: [],
      users: [],
      searchUser: '',
      more: false,
      loading: false,
      finished: false,
      isSearch: false,
      error: false,
      searchKeyword: '',
      searchDate: [],
      keyword: null,
      totalCount: 0
    }
  },
  computed: {
    ...mapGetters(['auths', 'user'])
  },
  watch: {
    // 用户搜索
    searchUser (user) {
      this.keyword = user
      if (this.searchKeyword) {
        this.keyword = `${user} ${this.searchKeyword}`
      }
      if (this.searchDate.length) {
        this.keyword = `${user} ${this.searchKeyword} ${this.searchDate}`
      }
      this.searchPage()
    },
    // 关键字搜索
    searchKeyword (newVal) {
      if (newVal) {
        this.keyword = newVal
        if (this.searchUser) {
          this.keyword = `${this.searchUser} ${newVal}`
        }
        if (this.searchDate.length) {
          this.keyword = `${this.searchUser} ${newVal} ${this.searchDate}`
        }
      } else {
        this.keyword = ''
        if (this.searchUser) {
          this.keyword = `${this.searchUser}`
        }
        if (this.searchDate.length) {
          this.keyword = `${this.searchUser} ${this.searchDate}`
        }
        this.$refs.searchKeyword.clear()
      }
      this.searchPage()
    },
    // 日期搜索
    searchDate (newDate) {
      if (newDate && newDate.length) {
        this.keyword = `${newDate[0]}至${newDate[1]}`
        if (this.searchUser) {
          this.keyword = `${this.searchUser} ${newDate[0]}至${newDate[1]}`
        }
        if (this.searchKeyword) {
          this.keyword = `${this.searchUser} ${this.searchKeyword} ${newDate[0]}至${newDate[1]}`
        }
      } else {
        this.keyword = ''
        this.isSearch = false
        if (this.searchUser) {
          this.keyword = `${this.searchUser}`
        }
        if (this.searchKeyword) {
          this.keyword = `${this.searchUser} ${this.searchKeyword}`
        }
        this.$refs.searchDate.clear()
      }
      this.searchPage()
    }
  },
  async created () {
    this.loading = true
    await this.initPage()
    this.loading = false
  },
  methods: {
    // 下拉框
    handleCommand (user) {
      this.searchUser = user[0] // eslint-disable-line
    },
    // 页面初始化
    async initPage () {
    },
    // 条件检索
    async searchPage () {
      this.totalCount = 0
      this.logs = []
      this.loading = true
      this.finished = false
    },
    // 下一页
    async nextPage () {
      this.more = true
      this.more = false
    },
    searchByUser (user) {
      this.searchUser = user
    },
    onQueryChange (query) {
      // 处理带空格的情况
      this.searchKeyword = query.trim()
    },
    handleDateChange (date) {
      this.searchDate = date
    },
    // 清空检索
    async backInit () {
      this.searchUser = ''
      this.searchKeyword = ''
      this.searchDate = []
      this.keyword = ''
      this.logs = []
      this.isSearch = false
      this.loading = true
      await this.initPage()
      this.loading = false
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"
  .log
    @include card(25px, 25px)
</style>
