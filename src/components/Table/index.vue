<template>
  <div
    class="v-table"
    :class="{ 'v-table--fix-header': headerFix }"
    :style="{ paddingTop }"
  >
    <section class="v-table__tools" ref="tools" @keyup.enter="fetch" v-if="headerFix || !noReset || $slots['tools-left']">
      <div class="v-table__tools--left">
        <slot name="tools-left" />
        <!-- 查询 -->
        <el-button v-if="$slots['tools-left']" type="primary" icon="el-icon-search" @click="fetch" />
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
      :data="data"
      :size="size"
      :height="tableHeight"
      stripe
      border
      @selection-change="$emit('selection-change', $event)"
      v-loading="loading"
    >
      <el-table-column
        v-for="(column, index) of columns"
        v-bind="column"
        :key="index"
        :align="column.align || 'center'"
        :formatter="column.formatter && !column.render && !column.operations ? column.formatter : row => row[column.prop] || placeholder"
      >
        <template v-if="column.render" v-slot="{ row, $index }">
          <RenderItem :render="column.render" :ctx="{ row, index: $index }" />
        </template>
        <template v-else-if="column.operations" v-slot="{ row, $index }">
          <template v-for="(item, index) of column.operations">
            <v-confirm-popover
              class="v-table__operate"
              v-if="item[2] === 'pop'"
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

<script lang="ts">
import { httpWithToken } from 'apis/axios'
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'

@Component({
  name: 'VTable',
  components: {
    RenderItem: {
      functional: true,
      props: {
        render: {
          type: Function
        },
        ctx: {
          type: Object,
          default: () => ({})
        }
      },
      render(createElement: CreateElement, { props }: RenderContext) {
        return props.render(createElement, props.ctx)
      }
    }
  },
  inheritAttrs: false
})
export default class VTable extends Vue {
  @Prop({ type: Array, default: () => [] }) 
  columns!: any[]

  @Prop({ type: Array, default: () => [10, 20, 40] }) 
  pageSizeList!: number[]

  @Prop({ type: String, default: 'total, sizes, prev, pager, next, jumper' }) 
  layout!: string

  @Prop({ type: Boolean }) 
  noPage!: boolean

  @Prop({ type: Boolean, default: true }) 
  headerFix!: boolean

  @Prop({ type: String }) 
  size!: string

  @Prop({ type: String }) 
  action!: string

  @Prop({ type: Object, default: () => ({}) }) 
  params!: Record<string, any>

  @Prop({ type: String, default: '——' }) 
  placeholder!: string

  @Prop({ type: Boolean }) 
  noReset!: boolean

  @Ref('tools') 
  readonly tools!: HTMLElement

  private _keyCodeMap: Record<string, 'leftArrowKey' | 'rightArrowKey' | 'rKey'> = {
    37: 'leftArrowKey',
    39: 'rightArrowKey',
    82: 'rKey'
  }

  query = {
    page: 0,
    size: 20,
    sort: 'modifiedAt,desc'
  }

  loading = false

  total = 0 // 数据总数量

  data: any[] = [{ a: 1, b: 2, c: 3, d: 4 }]// 表格数据

  paddingTop = ''// 表头的padding-top

  defaultParams = {} // 保存传入的query为默认值,方便重置

  get tableHeight() {
    const { noPage, noReset, headerFix } = this
    let subtractive = 0
    !noPage && (subtractive += 40)
    return headerFix || !noReset ? `calc(100% - ${subtractive}px)` : null
  }

  // 页面尺寸受到改动
  onResize() {
    const { headerFix, noReset } = this
    const toolsHeight = this.tools.getBoundingClientRect().height
    this.paddingTop = toolsHeight + 5 + 'px'
  }

  // 初始化
  init() {
    this.defaultParams = { ...this.params }
  }

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
  }

  // 分页size改变
  onPageSizeChange(size: number) {
    this.query.size = size
    this.fetch()
  }

  // 分页索引改变
  onPageNumberChange(page: number) {
    this.query.page = page - 1
    this.fetch()
  }

  // 松开按键事件
  onKeyup(ev: KeyboardEvent) {
    let { keyCode, altKey } = ev
    let { _keyCodeMap } = this
    if (_keyCodeMap[keyCode]) {
      let keyHandlerName  =_keyCodeMap[keyCode]
      this[keyHandlerName](altKey)
    }
  }

  // 左方向键
  leftArrowKey() {
    const { query } = this
    if (query.page <= 0) return
    query.page--
    this.fetch()
  }

  // 右方向键
  rightArrowKey() {
    const { query } = this
    const maxPage = ~~(this.total / query.size)
    if (query.page >= maxPage) return
    query.page++
    this.fetch()
  }

  // r键
  rKey(altKey: boolean) {
    if (!altKey) return
    this.onReset()
  }

  // 请求数据
  async fetch() {
    if (!this.action) return
    
    this.loading = true
    const res = await httpWithToken.post(this.action, this.params, {
      params: this.query
    })
    this.loading = false
    
    if (res.code !== 200) return

    const { content, totalElements } = res.content
    this.data = content
    this.total = totalElements
  }

  // 删除一条数据
  delete(index: number) {
    this.data.splice(index, 1)
    this.total--
  }

  // 更新一条数据
  update(index: number, document: { [key: string]: any} ) {
    this.data.splice(index, 1, document)
  }

  // 增加一条数据
  increase(document: { [key: string]: any}) {
    this.data.unshift(document)
    this.data.length > 20 && this.data.pop()
    this.total++
  }

  mounted() {
    this.init()
    this.onResize()
    this.fetch()
    window.addEventListener('resize', this.onResize)
    window.addEventListener('keyup', this.onKeyup)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keyup', this.onKeyup)
  }
}
</script>
