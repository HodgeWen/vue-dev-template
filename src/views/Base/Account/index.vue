<template>
  <v-page>
    <v-table is-list :columns="columns" action="/accounts">
      <template #tools-right>
        <el-button @click="$router.push({ name: 'accounts-create' })" type="primary">新增账户</el-button>
      </template>
    </v-table>

    <v-dialog v-model="dialog.visible" :title="dialog.title">
      
    </v-dialog>
  </v-page>
</template>

<script>
import dialog from 'mixins/dialog'
export default {
  mixins: [dialog],

  data: vm => ({
    columns: [
      { type: 'index', label: '#' },
      { label: '名称', prop: 'name' },
      { label: 'ghId', prop: 'ghId' },
      { label: 'appId', prop: 'appId' },
      { label: 'appSecret', prop: 'appSecret' },
      { label: 'token', prop: 'token' },
      { label: 'aesKey', prop: 'aesKey' },
      { label: 'templateId', prop: 'templateId' },
    ]
  })
}
</script>