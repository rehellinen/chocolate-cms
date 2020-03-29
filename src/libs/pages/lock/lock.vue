<template lang="pug">
  div.container
    el-form(ref="form" :model="form" label-width="80px")
      p.title Chocolate Disco
      el-input(v-model="form.pwd" placeholder="请输入锁定密码解锁" show-password)
      el-button(@click="unlocked") 解锁
</template>

<script>

export default {
  data () {
    return {
      form: {
        pwd: ''
      }
    }
  },
  methods: {
    unlocked () {
      let password = window.atob(localStorage.getItem('lockedPwd'))
      if (password === this.form.pwd) {
        localStorage.setItem('lockedPwd', '')
        this.$router.push('/')
        this.$message.success('解锁成功')
      } else {
        this.$message.error('解锁密码错误')
      }
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  @import "~sass/base.sass"
  .container
    height: 100%
    width: 100%
    background-color: $background-color
    display: flex
    align-items: center
    justify-content: center
    .el-form
      @include card
      box-shadow: 6px 11px 41px -28px #a99de7
      width: 80%
      max-width: 540px
      height: 300px
      display: flex
      flex-direction: column
      align-items: center
      justify-content: space-around
      padding-bottom: 20px
      .title
        color: $main-font-color
        font-size: $vast-font-size
        font-weight: bold
        margin-bottom: 15px
      .el-input
        /deep/ input
          height: 50px
          border: none
          border-bottom: 1px solid $background-color
      .el-button
        width: 100%
        height: 50px
        color: white
        background: $primary
        font-size: $big-font-size
</style>
