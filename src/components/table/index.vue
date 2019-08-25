<template>
  <div class="v-table">
    <!-- 表格主体 start -->
    <el-table :data="data" v-bind="$attrs" v-on="$listeners">
      <template v-for="(column, index) of columns">
        <el-table-column v-if="column.render" :key="index" v-bind="column">
          <RenderItem
            slot-scope="{ row, $index }"
            :render="column.render"
            :ctx="{ row, index: $index }"
          />
        </el-table-column>
        <el-table-column v-else :key="index" v-bind="column" />
      </template>
    </el-table>
    <!-- 表格主体 end -->

    <!-- 分页 start -->
    <el-pagination
      @size-change="onSizeChange"
      @current-change="onPageChange"
      :current-page="query.page + 1"
      :page-sizes="pageSizeList"
      :page-size="query.size"
      :layout="layout"
      :total="total"
    />
    <!-- 分页 end -->
  </div>
</template>

<script>
import './index.less'
export default {
  components: {
    RenderItem: {
      props: {
        render: {
          type: Function
        },

        ctx: {
          type: Object,
          default: () => ({})
        }
      },

      render(createElement) {
        return this.render(createElement, this.ctx)
      }
    }
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },

    columns: {
      type: Array,
      default: () => []
    },

    pageSizeList: {
      type: Array,
      default: () => [10, 20, 40]
    },

    total: {
      type: Number,
      default: 0
    },

    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },

  data: vm => ({
    query: {
      page: 0,
      size: 10
    }
  }),

  methods: {
    // 分页尺寸改变
    onSizeChange (size) {
      const { query } = this
      query.size = size
      this.$emit('fetch-data', query)
    },

    // 分页索引改变
    onPageChange (page) {
      const { query } = this
      query.page = page - 1
      this.$emit('fetch-data', query)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>