<template>
  <div class="layout-container">
    <!-- 表格 start -->
    <v-table
      ref="table"
      :data="table.data"
      :columns="table.columns"
      :total="table.total"
      @fetch-data="fetchTableData"
    />
    <!-- 表格 end -->

    <!-- 图表 start -->
    <!-- 可以传入class自定义容器宽高 -->
    <!-- 加切换按钮可以在外面套一层标签 -->
    <!-- 关于echarts的详细用法请查看echarts的官网, 主要查看配置项那个教程 -->
    <v-chart :option="chart.option" />
    <!-- 图表 end -->
  </div>
</template>

<script>
// 组件已全局注册，组件局部引入并注册
// 按需引入请修改main.js文件[查看main.js文件中的注释]
// import VTable from 'components/Table'
import VChart from 'components/Chart'
export default {
  // 组件局部引入
  components: {
    // VTable,
    VChart
  },
  data: vm => ({
    // 开发规范
    // 1. 模板上需要的数据务必声明好, 好处在于可以知道此数据的类型, 以及避免一些错误
    // 2. 一个组件需要维护大量的状态时, 建议将数据对象分组, 最好是与模板对应
    table: {
      total: 0, // 在请求到数据后设置

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
    },

    chart: {
      // 此处的option是初始化, 后面拉取到数据只需 改变option的值即可 方式在mounted中查看
      option: {
        // 图例
        legend: {
          show: true
        },
        // x轴
        xAxis: {
          // 如果x轴是动态的可以先不写
          data: ['1月', '2月', '3月', '4月'],
          // 刻度
          axisTick: {
            show: false
          },
          // 轴线
          axisLine: {
            show: false
          }
        },

        tooltip: {
          show: true
        },

        // y轴
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          },
          splitLine: {
            show: false
          }
        },

        // 缩放
        dataZoom: [{ type: 'slider' }],

        // 列表可设置列表类型
        series: [
          {
            name: '数量',
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            },
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#83bff6' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#188df0' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              barBorderRadius: [20, 20, 0, 0]
            },
            // 通过setOption去设置
            data: [200, 200, 200, 150]
          }
        ]
      }
    }
  }),
  methods: {
    // 拉取分页数据
    async fetchTableData(pagination) {
      // 执行请求操作
      const res = await this.$axios
        .get('/something/page', {
          params: {
            ...this.query,
            ...pagination
          }
        })
        .catch(err => {
          // 处理错误, 弹出提示或者存入日志表
          alert(err)
          // ...
          // 此处尽量返回一个null
          return null
        })

      // 执行赋值操作
      if (!res) return
      const { table } = this
      table.data = res.data
      table.total = res.total
    },

    // 拉取图表数据
    async fetchChartData() {
      // 模拟
      this.$axios.get('/chart/data', {
        params: {}
      }).then(res => {
        // 保证传入的是两个数组. 否则会出错
        console.log(res)
        // this.setOption(res.data.xData, res.data.yData)
      })
    },

    // 设置参数
    setOption (xData, seriesData) {
      this.chart.option = {
        xAxis: {
          data: xData || []
        },
        series: {
          data: seriesData || []
        }
      }
    }
  },

  mounted() {
    // 如果想拿到表格和分页的实例对象 请如下
    const [tableInstance, pageInstance] = this.$refs.table.$children
    console.log(tableInstance, pageInstance)
    // 在真实环境下测试获取数据
    // this.fetchTableData()

    // 改变图表配置, 此操作在获取后端返回值之后设置, 2秒后查看页面结果
    // 这是一个定时器方法,用来模拟异步请求
    setTimeout(() => {
      this.setOption(
        ['1月', '2月', '3月', '4月', '5月', '6月'],
        [100, 120, 220, 150, 200, 190]
      )
    }, 2000)
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
}

.item {
  width: 200px;
  height: 200px;
  background: @theme-color;
}
</style>