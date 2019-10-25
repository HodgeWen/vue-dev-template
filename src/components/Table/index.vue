<template>
  <div class="v-table" :class="{ 'v-table--fix-header': headerFix }" :style="{ paddingTop }">
    <section
      class="v-table__tools"
      ref="tools"
      v-if="headerFix && ($slots.tools || $slots.toolsLeft)"
    >
      <div class="v-table__tools--left">
        <slot name="tools" />
      </div>
      <div class="v-table__tools--right">
        <!-- 重置 -->
        <el-button
          type="warning"
          icon="el-icon-refresh"
          size="small"
          plain
          @click="onReset"
        >{{$t('reset')}}</el-button>
        <slot name="tools-right" />
      </div>
    </section>
    <!-- 表格主体 start -->
    <el-table
      :data="data"
      :height="tableHeight"
      :size="size"
      stripe
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-for="(column, index) of columns">
        <el-table-column
          v-if="column.render"
          :key="index"
          v-bind="column"
          :align="column.align || 'center'"
        >
          <template v-slot="{ row, $index }">
            <RenderItem :render="column.render" :ctx="{ row, index: $index }" />
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" v-bind="column" :align="column.align || 'center'" />
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

    headerFix: Boolean,

    size: {
      type: String,
      default: 'small'
    },

    query: {
      type: Object,
      default: () => ({
        page: 0,
        size: 10
      })
    }
  },

  data: vm => ({
    paddingTop: '',

    // 保存传入的query为默认值,方便重置
    defaultQuery: {}
  }),

  computed: {
    tableHeight () {
      const { noPage, headerFix } = this
      let subtractive = 0
      !noPage && (subtractive += 40)
      return headerFix ? `calc(100% - ${subtractive}px)` : null
    }
  },

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
    },

    // 页面尺寸受到改动
    onResize () {
      const { headerFix, $slots } = this
      if (!headerFix || !$slots.tools) return

      const toolsHeight = this.$refs.tools.getBoundingClientRect().height
      this.paddingTop = toolsHeight + 5 + 'px'
    },

    // 重置
    onReset () {
      // 分页置为传进时的分页
      this.$merge(this.query, this.defaultQuery)
      this.$emit('fetch-data', this.query)
    },

    // 初始化
    init () {
      this.defaultQuery = { ...this.query }
    }
  },

  mounted () {
    this.init()

    this.onResize()
    window.addEventListener('resize', this.onResize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss">
.el-pagination {
  text-align: right;
  padding: 6px;
}

.v-table {
  height: 100%;
  position: relative;

  &--fix-header {
    height: 100%;
  }

  &__tools {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    border-bottom: 1px solid #eee;
    padding-top: 5px;
    @include flex(space-between, flex-start, nowrap);

    &--left {
      & > * {
        margin-bottom: 5px;
        margin-right: 6px;
      }
    }

    &--right {
      max-width: 360px;
      white-space: nowrap;
      & > * {
        margin-bottom: 5px;
        margin-left: 6px;
      }
    }
  }

  .el-table__header th {
    background-color: #f0f2f5;
    height: 50px;
  }
}
</style>