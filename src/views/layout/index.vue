<template>
  <div class="container">
    <aside class="aside">
      <router-link :to="{ name: 'table' }">Table</router-link>
    </aside>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$aside-width: 240px;
.container {
  height: 100vh;
  width: 100%;
  @include flex(space-between, flex-start);
  min-width: 1300px;
}

.aside, .main {
  height: 100%;
}

.aside {
  width: $aside-width;
  border-right: 1px solid #ccc;
}
.main {
  width: calc(100% - #{$aside-width});
  padding: 8px;
}
</style>