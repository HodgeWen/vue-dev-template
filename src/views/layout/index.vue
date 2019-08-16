<template>
  <div class="layout-container">
    <div class="item" v-for="n of 3" :key="n"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100vh;
  .flex(space-between, center);
}

.item {
  width: 200px;
  height: 200px;
  background: @theme-color;
}
</style>