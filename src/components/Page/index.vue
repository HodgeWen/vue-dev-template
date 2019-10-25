<template>
  <div class="v-page">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VPage'
}
</script>

<style lang="scss">
.v-page {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: #ffffff;
  padding: 4px 8px;
}
</style>