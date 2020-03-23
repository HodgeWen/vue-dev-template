<template>
  <aside>
    <section class="logo">
      <div class="logo__box">
        后台
      </div>
    </section>
    <el-scrollbar class="menus">
      <el-menu
        :collapse-transition="false"
        :default-active="defaultActive"
        :collapse="collapse"
      >
        <template v-for="({ name, label, children, icon }) of menus">
          <!-- 一级路由中有子路由且子路由不为空 -->
          <el-submenu v-if="children && children.length" :key="label" :index="label">
            <template #title>
              <v-icon :type="icon" />
              <span style="margin-left: 5px">{{label}}</span>
            </template>
            <el-menu-item
              v-for="({ name: subName, label: subLabel }) of children"
              :key="subName"
              :index="`${label}/${subLabel}`"
              @click.native="onMenuItemNativeClick(subName)"
            >{{subLabel}}</el-menu-item>
          </el-submenu>

          <!-- 一级路由中没有有子路由,则直接做跳转功能 -->
          <el-menu-item
            v-else
            :key="name"
            @click.native="onMenuItemNativeClick(name)"
            :index="label"
          >
            <v-icon :type="icon" />
            <span style="margin-left: 5px" slot="title">{{label}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
import { Menu, Submenu, MenuItem } from 'element-ui'
import { sessionCache } from '@/cache'
import {  } from 'apis/index'
import menus from './menu'
export default {
  components: {
    'el-menu': Menu,
    'el-submenu': Submenu,
    'el-menu-item': MenuItem
  },

  props: {
    // 控制侧栏是否折叠
    collapse: Boolean
  },

  data: () => ({
    menus
  }),

  methods: {
    // 获得人员菜单信息
    async fetchMenus() {
      // 默认从缓存中获取
      const menus = sessionCache.get('menus')
      if (menus) return (this.menus = menus)

      // 缓存没有menus则请求接口
      const res = await fetchUserMenus()
      if (res.code !== 'success') return

      // menu存入缓存并生成路由名称对应激活标识的映射表
      sessionCache.set('menus', res.content)
      this.menus = res.content
    },

    // menuitem原生点击事件， 用来做路由跳转
    onMenuItemNativeClick(route) {
      route !== this.$route.name && this.$router.push({ name: route })
    }
  },

  computed: {
    defaultActive() {
      return this.$store.state.breadcrumbs.slice(0, 2).map(item => item.label).join('/')
    }
  },

  mounted() {
    // this.fetchMenus()
  }
}
</script>

<style lang="scss" scoped>
@import '../var.scss';
.logo {
  background-color: $theme-color;
  color: #ffffff;
  @include nowrap;
  line-height: $header-height + $tags-height;
  height: $header-height + $tags-height;
  padding: 0 6px;
  font-size: 0;

  &__box {
    display: inline-block;
    text-align: center;
    width: 100%;
    vertical-align: middle;
    line-height: 64px;
    height: 64px;
    border-radius: 16px;
    box-shadow: 3px 6px 10px 0px rgba(230, 0, 18, 0.3);
    background: $primary-color;
    overflow: hidden;
  }

  img {
    height: 42px;
    width: auto;
    vertical-align: middle;
  }
}

.menus::v-deep {
  height: calc(100% - #{$header-height} - #{$tags-height});
  background-color: #fff;

  .el-menu-item, .el-submenu__title {
    &.is-active,  &:hover {
      background-color: #FBE3E3;
      color: $primary-color;
      i {
        color: $primary-color;
      }
    }
  }

  // .el-submenu {
  //   &.is-active {
  //     .el-submenu__title {
  //       background-color: #FBE3E3;
  //       color: $primary-color;
  //       i {
  //         color: $primary-color;
  //       }
  //     }
  //   }

  //   &.is-opened {
  //     .el-submenu__title {
  //       background-color: #fff;
  //       color: initial;
  //       i {
  //         color: initial;
  //       }
  //     }
  //   }
  // }
}
</style>


