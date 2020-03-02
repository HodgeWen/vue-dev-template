<template>  
  <Breadcrumb class="breadcrumb" separator="/">
    <BreadcrumbItem
      v-for="({ name, label }, index) of breadcrumbs"
      :to="(name && name !== $route.name) ? { name } : null"
      :key="index"
      :class="index === breadcrumbs.length - 1 ? 'breadcrumb--active' : ''"
    >
      {{label}}
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import { sessionCache } from '@/cache'
import menus from '../Aside/menu'
export default {
  components: {
    Breadcrumb, BreadcrumbItem
  },

  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.updateBreadcrumb()
      }
    }
  },

  methods: {
    // 更新面包屑
    updateBreadcrumb() {
      const { name, meta } = this.$route

      let currentRoute = {
        label: meta.title,
        name
      }

      let breadcrumbs = meta.pre instanceof Array ? meta.pre.map(([label, name]) => ({ label, name })).concat(currentRoute) : [currentRoute]
      
      this.$store.commit('setBreadcrumbs', breadcrumbs)
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb::v-deep {
  margin-left: 12px;

  .el-breadcrumb__inner {
    color: #999999;
  }
}
.breadcrumb--active::v-deep {
  .el-breadcrumb__inner{
    color: #E60012;

    &:hover {
      color: #E60012;
    }
  }
}
</style>
