<template>
  <div>
    <v-table
      header-fix
      stripe
      size="small"
      :columns="table.columns"
      :total="table.total"
      @fetch-data="fetchTableData"
      :data="table.data"
      ref="table"
    >
      <template #tools>
        <el-date-picker v-model="table.date" type="date" placeholder="选择日期" />
        <el-button style="margin-left: 6px">查询</el-button>
      </template>
    </v-table>
  </div>
</template>

<script>
export default {
  data: vm => ({
    table: {
      total: 100, // 在请求到数据后设置

      // 表格数据，实际过程中应给个空的数组
      data: Array(20)
        .fill()
        .map(item => ({
          name: '某某某',
          age: 20,
          sex: 'MALE',
          test: 'test',
          award: [
            { date: '2019-09-01', title: 'xxs比赛第一名' },
            { date: '2019-02-01', title: 'xxs比赛第三名' }
          ]
        })),

      columns: [
        { type: 'index' },
        { type: 'selection' },
        {
          type: 'expand',
          render(h, { row, index }) {
            const table = h('v-table', {
              props: {
                'no-page': true,
                columns: [
                  { label: '获奖时间', prop: 'date' },
                  { label: '奖项', prop: 'title' }
                ],
                data: row.award
              }
            })

            const exportButton = h('el-button', {
              style: {
                marginTop: '8px'
              },
              props: {
                type: 'primary'
              },
              on: {
                click: () => alert(`点击了第 ${index + 1} 条数据中的导出excel按钮`)
              }
            }, '导出excel')

            return h('div', {
              style: {
                textAlign: 'right'
              }
            }, [
              table, exportButton
            ])
          }
        },
        { label: '姓名', prop: 'name' },
        { label: '年龄', render (h, { row }) {
          return h('span', {
            on: {
              click: () => alert(`点击了年龄${row.age}`)
            }
          }, row.age)
        } },
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
                  click: () => console.log(row === vm.table.data[index])
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
      },

      date: ''
    }
  }),

  methods: {
    async fetchTableData(pagination) {
      console.log(pagination)
    }
  }
}
</script>
