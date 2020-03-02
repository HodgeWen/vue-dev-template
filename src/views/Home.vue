<template>
  <div class="home">
    <v-table
      ref="table"
      :params="params"
      :columns="columns"
    />
  </div>
</template>
<script lang="tsx">
import Table from 'components/Table/index.vue'
import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'

interface ColumnData {
  row: {
    [key: string]: any;
  };

  index: number;
}

@Component
export default class Home extends Vue {
  private readonly columns = [
    { label: '标题一', prop: 'a' },
    { label: '标题二', prop: 'b' },
    { label: '标题三', prop: 'c' },
    { label: '标题四', prop: 'd' },
  ]

  private params = {
    name: ''
  }

  // render() {
  //   return (
  //     <Table />
  //   )
  // }
}
</script>
