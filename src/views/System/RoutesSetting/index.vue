<template>
  <v-page>
    <v-table :data="table.data" :columns="columns" @data-fetch="onFetch" size="small" header-fix>
      <template #tools-left>
        <el-input
          style="width: 120px;"
          :placeholder="$t('pleaseEnterTheQueryCriteria')"
          v-model="query.name"
          clearable
        ></el-input>
      
        <!-- 查看子页面 -->
        <el-button
          type="primary"
          @click="$router.push({ name: 'router-child' })"
        >子页面</el-button>
      </template>

      <template #tools-right>
        <!--新增 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          plain
          @click="openAdd"
        >{{$t('add')}}</el-button>
      </template>
    </v-table>

    <v-dialog :title="dialog.title" v-model="dialog.show" @change="!$event && $refs.form.resetFields()" @confirm="onSubmit">
      <el-form :model="form" label-width="80px" ref="form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="路由">
          <el-input v-model="form.route" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
    </v-dialog>
  </v-page>
</template>

<script>
import Vue from 'vue'
import Language from 'components/Language'
import i18n from './i18n'
import { pageRequest } from 'mixins/index'
export default {
  name: 'RoutesSetting',
  i18n,

  mixins: [
    pageRequest({
      api: () => {},
      query: {}
    })
  ],

  data: vm => ({
    columns: [
      { type: 'selection', fixed: true },
      { type: 'index' },
      { prop: 'name', label: '名称', minWidth: 150 },
      { prop: 'route', label: '路由', minWidth: 150 },
      {
        label: '操作',
        fixed: 'right',
        minWidth: 120,
        render(h, { row, index }) {
          const view = vm.$createOperation({
            icon: 'el-icon-edit',
            size: 'mini',
            onClick: () => {
              vm.openEdit(row)
            }
          })

          const del = vm.$createOperation({
            icon: 'el-icon-delete',
            type: 'danger',
            size: 'mini',
            onClick: () => {}
          })
          return h('div', [view, del])
        }
      }
    ],

    dialog: {
      show: false,
      type: '',
      title: '',
      params: {
        id: ''
      }
    },

    form: {
      name: '',
      icon: '',
      route: ''
    },

    model: null
  }),

  methods: {
    onFetch(e) {
      console.log(e)
    },

    onSubmit() {
      this.$msg.success('提交成功')
    },

    openEdit(row) {
      const { dialog, form } = this
      dialog.show = true
      dialog.type = 'edit'
      dialog.title = '编辑路由'
      this.$merge(form, row)
    },

    openAdd() {
      const { dialog } = this
      dialog.show = true
      dialog.type = 'add'
      dialog.title = '新增路由'
    },

    reset() {
      console.log('reset')
    }
  }
}
</script>

