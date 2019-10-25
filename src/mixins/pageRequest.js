export default function({ api, table, query } = {}) {
  return {
    data: () => ({
      query: {
        page: 0,
        size: 10,
        ...query
      },
      table: {
        total: 0,
        data: [],
        ...table
      }
    }),

    methods: {
      // 获取分页数据
      async fetchPageData() {
        const res = await api(this.query)
        if (!res || res.code !== 'success') return
        const { list, total } = res.content
        this.table.data = list
        this.table.total = total
      }
    },

    mounted() {
      this.fetchPageData()
    }
  }
}
