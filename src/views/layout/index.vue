<template>
  <div class="container">
    <el-menu class="aside" :default-active="routeName">
      <el-menu-item
        @click="navTo(route)"
        v-for="({ route, name }, index) of menus"
        :index="route"
        :key="index"
      >{{name}}</el-menu-item>
    </el-menu>
    <transition name="el-fade-in" mode="out-in">
      <router-view class="main" />
    </transition>
  </div>
</template>

<script>
export default {
  data: vm => ({
    menus: [
      { route: 'table', name: '表格 Table' },
      { route: 'chart', name: '图表 Chart' },
      { route: 'doubleInput', name: '双输入框 DoubleInput' }
    ]
  }),

  computed: {
    routeName() {
      return this.$route.name
    }
  },

  methods: {
    navTo(name) {
      name !== this.routeName && this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
$aside-width: 240px;
.container {
  height: 100vh;
  width: 100%;
  @include flex(space-between, flex-start);
  min-width: 1300px;
}

.aside,
.main {
  height: 100%;
}

.aside {
  width: $aside-width;
  border-right: 1px solid #ccc;
}
.main {
  width: calc(100% - #{$aside-width});
  padding: 8px;
  overflow: auto;
}
</style>