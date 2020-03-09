<template lang="pug">
  el-breadcrumb(separator-class="el-icon-arrow-right")
    el-breadcrumb-item(v-for="(item, index) in data" :key="index")
      router-link(to="/" v-if="index === 0")
        a {{item}}
      a(@click="toTable" v-else-if="index === 1") {{item}}
      p(v-else) {{item}}
</template>

<script>
export default {
  name: 'ChocBread',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    toTable () {
      this.$emit('table')
    }
  }
}
</script>

<style scoped lang="sass" rel="stylesheet/sass">
  .el-breadcrumb
    margin-bottom: 15px
</style>
