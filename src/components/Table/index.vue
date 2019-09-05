<template>
  <div class="v-table" :class="{ 'v-table--fix-header': headerFix }">
    <section class="v-table__tools" v-if="headerFix">
      <slot name="tools" />
    </section>
    <!-- 表格主体 start -->
    <el-table
      :data="data"
      :height="headerFix ? tableHeight : null"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="(column, index) of columns">
        <el-table-column v-if="column.render" :key="index" v-bind="column" :align="column.align || 'center'">
          <template v-slot="{ row, $index }">
            <RenderItem :render="column.render" :ctx="{ row, index: $index }" />
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" v-bind="column" />
      </template>
    </el-table>
    <!-- 表格主体 end -->

    <!-- 分页 start -->
    <el-pagination
      v-if="!noPage"
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
import './index.scss'
export default {
  name: 'VTable',

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

  inheritAttrs: false,

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
    },

    noPage: Boolean,

    headerFix: Boolean
  },

  data: vm => ({
    query: {
      page: 0,
      size: 10
    },

    tableHeight: 'calc(100% - 90px)'
  }),

  methods: {
    // 分页尺寸改变
    onSizeChange(size) {
      const { query } = this
      query.size = size
      this.$emit('fetch-data', query)
    },

    // 分页索引改变
    onPageChange(page) {
      const { query } = this
      query.page = page - 1
      this.$emit('fetch-data', query)
    }
  }
}
</script>