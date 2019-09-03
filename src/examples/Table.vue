<template>
  <v-table
    :columns="table.columns"
    :total="table.total"
    @fetch-data="fetchTableData"
    :data="table.data"
    ref="table"
  />
</template>

<script>
export default {
  data: vm => ({
    table: {
      total: 100, // 在请求到数据后设置

      // 表格数据，实际过程中应给个空的数组
      data: [
        { name: '张三', age: 20, sex: 'MALE' },
        { name: '李四', age: 22, sex: 'FEMALE' },
        { name: '王五', age: 20, sex: 'FEMALE' },
        { name: '钱六', age: 20, sex: 'MALE' },
        { name: '赵七', age: 20, sex: 'MALE' }
      ],

      columns: [
        { type: 'index' },
        { type: 'selection' },
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' },
        {
          label: '性别',
          prop: 'sex',
          formatter(row, column, cellValue, index) {
            // 查看控制台得到该函数的所有参数
            // console.log(row, column, cellValue, index)
            return {
              FEMALE: '女',
              MALE: '男'
            }[cellValue]
          }
        },
        {
          label: '操作',
          render(h, { row, index }) {
            // 下面代码比较长, 业务中建议封装成函数生成
            const view = h(
              'el-button',
              {
                props: {
                  type: 'primary',
                  size: 'mini',
                  round: true
                },
                on: {
                  click: () => alert(`你查看了${row.name}`)
                }
              },
              '查看'
            )
            const del = h('el-button', {
              props: {
                type: 'danger',
                size: 'mini',
                round: true,
                icon: 'el-icon-delete'
              },
              on: {
                click: () => {
                  alert(`你删除了${row.name}`)
                  vm.table.data.splice(index, 1)
                }
              }
            })
            return h('div', [view, del])
          }
        }
      ],

      // 分页的查询参数
      query: {
        startDate: '',
        endDate: '',
        name: ''
      }
    }
  }),

  methods: {
    async fetchTableData(pagination) {
      console.log(pagination)
    }
  }
}
</script>
