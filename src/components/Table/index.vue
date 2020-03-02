<template>
  <div
    class="v-table"
    :class="{ 'v-table--fix-header': headerFix }"
    :style="{ paddingTop, height }"
  >
    <section class="v-table__tools" ref="tools" @keyup.enter="fetch" v-if="!noReset || $slots['tools-left'] || $slots['tools-right']">
      <div class="v-table__tools--left">
        <slot name="tools-left" />
        <!-- 查询 -->
        <el-button v-if="$slots['tools-left'] && !hideSearchButton" type="primary" icon="el-icon-search" @click="fetch" />
      </div>
      <div class="v-table__tools--right">
        <!-- 重置 -->
        <el-tooltip content="重置[Alt + R]" placement="left">
          <el-button v-if="!noReset" type="info" icon="el-icon-refresh" @click="onReset" />
        </el-tooltip>
        <slot name="tools-right" />
      </div>
    </section>
   
    <!-- 表格主体 start -->
    <el-table
      :data="getData()"
      :size="size"
      :height="tableHeight"
      stripe
      border
      @expand-change="onExpandChange"
      @selection-change="$emit('selection-change', $event)"
      v-loading="loading"
      element-loading-text="数据加载中..."
    >
      <el-table-column
        v-for="(column, index) of columns"
        v-bind="column"
        :key="index"
        :align="column.align || 'center'"
        :formatter="formatter(column)"
      >
        <template v-if="column.render" v-slot="{ row, $index }">
          <RenderItem :render="column.render" :ctx="{ row, index: $index }" />
        </template>
        <template v-else-if="column.operations" v-slot="{ row, $index }">
          <template v-if="getOperations(column, { row, index: $index }).length < 1">
            ——
          </template>
          <template v-else>
            <template v-for="(item, index) of getOperations(column, { row, index: $index })">
              <v-confirm-popover
                class="v-table__operate"
                :tips="item[2] === 'pop' ? '确定?' : item[2]"
                v-if="item[2]"
                :key="index"
                @confirm="$emit(item[1], { row, index: $index })"
              >
                <el-button type="text">{{item[0]}}</el-button>
              </v-confirm-popover>
              <el-button
                v-else
                class="v-table__operate"
                type="text"
                :key="index"
                @click="$emit(item[1], { row, index: $index })"
              >{{item[0]}}</el-button>
            </template>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格主体 end -->

    <!-- 分页 start -->
    <el-pagination
      v-if="!noPage"
      @size-change="onPageSizeChange"
      @current-change="onPageNumberChange"
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
import { httpDefault } from 'apis/axios'
export default {
  name: 'VTable',

  components: {
    RenderItem: {
      functional: true,

      props: {
        render: Function,

        ctx: {
          type: Object,
          default: () => ({})
        }
      },

      render(createElement, { props }) {
        return props.render(createElement, props.ctx)
      }
    }
  },

  inheritAttrs: false,

  props: {
    columns: {
      type: Array,
      default: () => []
    },

    customData: Array,

    pageSizeList: {
      type: Array,
      default: () => [10, 20, 40]
    },

    height: String,

    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },

    noPage: Boolean,

    headerFix: {
      type: Boolean,
      default: true
    },

    size: {
      type: String
    },

    action: {
      type: String
    },

    params: {
      type: Object,
      default: () => ({})
    },

    placeholder: {
      type: String,
      default: '——'
    },

    noReset: Boolean,

    mapHandler: Function,

    hideSearchButton: Boolean
  },

  data: vm => ({
    query: {
      page: 0,
      size: 20,
      sort: 'modifiedAt,desc'
    },

    loading: false,

    total: 0, // 数据总数量

    data: [], // 表格数据

    paddingTop: '', // 表头的padding-top

    // 按键映射表
    _keyCodeMap: {
      37: 'leftArrowKey',
      39: 'rightArrowKey',
      82: 'rKey'
    },

    defaultParams: {} // 保存传入的query为默认值,方便重置
  }),

  computed: {
    tableHeight() {
      const { noPage, noReset, headerFix, $slots } = this
      let subtractive = 0
      !noPage && (subtractive += 40)
      !noReset && !$slots['tools-left'] && !$slots['tools-right'] && (subtractive += 40)
      return (headerFix || !noReset) ? `calc(100% - ${subtractive}px)` : null
    }
  },

  methods: {
    getData() {
      let { action, data, customData, mapHandler } = this
      let _data = action ? data : customData
      return mapHandler ? _data.map(mapHandler) : _data
    },

    // 页面尺寸受到改动
    onResize() {
      const { headerFix, noReset } = this
      const toolsHeight = this.$refs.tools ? this.$refs.tools.getBoundingClientRect().height : 0
      this.paddingTop = this.$refs.tools ? toolsHeight + 5 + 'px' : 0
    },

    // 获取操作按钮
    getOperations({ operations }, ctx) {
      return (typeof operations === 'function' ? operations(ctx) : operations) || []
    },

    // 初始化
    init() {
      this.defaultParams = { ...this.params }
    },

    // 重置
    onReset() {
      this.$mergeSync(this.params, this.defaultParams)
      // this.$emit('params-change', { ...this.defaultParams })
      this.query = {
        page: 0,
        size: 20,
        sort: 'modifiedAt,desc'
      }
      this.fetch()
      // this.$nextTick(this.fetch)
    },

    // 分页size改变
    onPageSizeChange(size) {
      this.query.size = size
      this.fetch()
    },

    // 分页索引改变
    onPageNumberChange(page) {
      this.query.page = page - 1
      this.fetch()
    },

    // 松开按键事件
    onKeyup({ keyCode, altKey }) {
      const { _keyCodeMap } = this.$data
      const keyHandlerName = _keyCodeMap[keyCode]
      this[keyHandlerName] && this[keyHandlerName](altKey)
    },

    // 左方向键
    leftArrowKey() {
      const { query } = this
      if (query.page <= 0) return
      query.page--
      this.fetch()
    },

    // 右方向键
    rightArrowKey() {
      const { query } = this
      const maxPage = ~~(this.total / query.size)
      if (query.page >= maxPage) return
      query.page++
      this.fetch()
    },

    // r键
    rKey(altKey) {
      if (!altKey) return
      this.onReset()
    },

    // 请求数据
    async fetch() {
      if (!this.action) return

      const isList = this.action.lastIndexOf('list') !== -1

      if (isList) {
        delete this.query.size
        delete this.query.page
      }

      this.loading = true
      const res = await httpDefault.post(this.action, this.params, {
        params: this.query
      })
      this.loading = false
      
      if (res.code !== 200) return

      if (isList) {
        this.data = res.content
        this.total = res.content.length
      } else {
        const { content, totalElements } = res.content
        this.data = content
        this.total = totalElements
      }
    },

    // 删除一条数据
    delete(index) {
      this.data.splice(index, 1)
      this.total--
      if (this.data.length < 1 && this.total > 0) {
        this.fetch()
      }
    },

    // 更新一条数据
    async update(index, document) {
      if (document) {
        this.data.splice(index, 1, document)
      } else {
        let res = await httpDefault.get(this.action.replace('page', this.data[index].id))
        if (res.code !== 200) return
        this.data.splice(index, 1, res.content)
      }
    },

    // 增加一条数据
    async increase(document) {
      if (!document) return

      if (typeof document === 'string') {
        let res = await httpDefault.get(this.action.replace('page', document))
        if (res.code !== 200) return
        this.data.unshift(res.content)
      } else {
        this.data.unshift(document)
      }
      
      this.data.length > 20 && this.data.pop()
      this.total++
    },

    formatter(column) {
      let { formatter, deepProp, prop } = column

      if (column.render || column.operations) return null

      if (formatter) return formatter

      if (prop) {
        return row => row[prop] || this.placeholder
      }

      if (deepProp) {
        return (row) => {
          let propArr = deepProp.split('.')
          let ret = row
          let success = propArr.some(prop => {
            if (ret[prop]) {
              ret = ret[prop]
            } else {
              return true
            }
          })
          propArr = null
          return success ? this.placeholder : ret 
        }
      }
    },

    onExpandChange(...args) {
      this.$emit('expand-change', ...args)
    }
  },

  mounted() {
    this.init()
    this.onResize()
    this.fetch()
    window.addEventListener('resize', this.onResize)
    window.addEventListener('keyup', this.onKeyup)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keyup', this.onKeyup)
  }
}
</script>
