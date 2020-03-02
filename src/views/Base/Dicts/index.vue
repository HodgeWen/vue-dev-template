<template>
  <v-page>
    <v-table :params="params" :columns="columns" action="/api-identity/dict/page">
      <template #tools-left>
        <v-input placeholder="输入数据字典名称" v-model="params.name" />
      </template>
    </v-table>
  </v-page>
</template>

<script>
export default {
  data: vm => ({
    params: {
      name: ''
    },

    columns: [
      { type: 'index', label: '#' },
      { label: '字典编码', prop: 'code' },
      { label: '字典名称', prop: 'name' }
    ]
  })
}
</script>