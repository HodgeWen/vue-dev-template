<template>
  <div class="layout-container">
    <i-table :columns="columns" :data="data"></i-table>
    <i-button type="primary">fffff</i-button>
  </div>
</template>

<script>
export default {
  data: vm => ({
    data: [
      { name: '张三', age: 20 },
      { name: '张三', age: 20 },
      { name: '张三', age: 20 },
      { name: '张三', age: 20 },
      { name: '张三', age: 20 }
    ],

    columns: [
      { type: 'selection' },
      { key: 'name', title: '姓名' },
      { key: 'age', title: '年龄' }
    ]
  })
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
}

.item {
  width: 200px;
  height: 200px;
  background: @theme-color;
}
</style>