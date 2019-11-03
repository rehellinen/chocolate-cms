<template lang="pug">
  el-container
    el-header 普通表格
    el-main
       my-table(:data="tableData" :tableColumn="tableColumn" index="1" :pageConf="pageConf")
    el-header 带边框表格
    el-main
      my-table(:data="tableData" :tableColumn="tableColumn" index="1" :pageConf="pageConf" :border="true")
    el-header 固定表头
    el-main
      my-table(:data="tableData" :tableColumn="tableColumn" index="1" :pageConf="pageConf" :height="180")
    el-header 固定列
    el-main
      my-table(:data="tableFixedData" :tableColumn="tableFixedColumn" :pageConf="pageConf")

</template>

<script>
import MyTable from '../base/table/table'
export default {
  components: {
    MyTable
  },
  data () {
    return {
      activeName: '1',
      tableColumn: [
        {
          name: 'date',
          label: '日期'
        }, {
          name: 'name',
          label: '姓名'
        }, {
          name: 'address',
          label: '地址'
        }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      tableFixedColumn: [
        {
          name: 'date',
          label: '日期',
          width: 100,
          fixed: 'left'
        }, {
          name: 'name',
          label: '姓名',
          width: 200
        }, {
          name: 'province',
          label: '省份',
          width: 200
        }, {
          name: 'city',
          label: '市区',
          width: 200
        }, {
          name: 'address',
          label: '地址',
          width: 300
        }, {
          name: 'zip',
          label: '邮编',
          width: 100,
          fixed: 'right'
        }
      ],
      tableFixedData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ],
      pageConf: {
        pageSize: 4,
        totalItem: 4
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .el-header
    background-color: #B3C0D1
    color: white
    font-size: 24px
    text-align: center
    line-height: 60px
  .el-main
    border: 1px #B3C0D1 solid
    background-color: white!important
    margin-bottom: 100px
</style>
