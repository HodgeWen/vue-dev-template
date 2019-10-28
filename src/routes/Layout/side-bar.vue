<template>
  <aside>
    <section class="logo">开发模板</section>
    <el-scrollbar class="menus">
      <el-menu
        :collapse-transition="false"
        :default-active="defaultActive"
        :collapse="collapse"
        background-color="#42475a"
        text-color="#fff"
        active-text-color="#00C1DE"
      >
        <template v-for="({ routeName, routeLabel, children, icon }) of menus">
          <!-- 一级路由中有子路由且子路由不为空 -->
          <el-submenu v-if="children && children.length" :key="routeName" :index="routeName">
            <template #title>
              <i :class="icon"></i>
              <span>{{routeLabel}}</span>
            </template>
            <el-menu-item
              v-for="({ routeName: subRouteName, routeLabel: subRouteLabel }) of children"
              :key="subRouteName"
              :index="`${routeName}/${subRouteName}`"
              @click.native="onMenuItemNativeClick(subRouteName)"
            >{{subRouteLabel}}</el-menu-item>
          </el-submenu>

          <!-- 一级路由中没有有子路由,则直接做跳转功能 -->
          <el-menu-item
            v-else
            :key="routeName"
            @click.native="onMenuItemNativeClick(routeName)"
            :index="routeName"
          >
            <i :class="icon"></i>
            <span slot="title">{{routeLabel}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
import { Menu, Submenu, MenuItem } from 'element-ui'
import { sessionCache } from '@/cache'
import { getMenus } from 'apis/index'
import i18n from './i18n'
export default {
  components: {
    'el-menu': Menu,
    'el-submenu': Submenu,
    'el-menu-item': MenuItem
  },

  i18n,

  props: {
    // 控制侧栏是否折叠
    collapse: Boolean
  },

  data: () => ({
    menus: [
      {
        routeName: 'system',
        routeLabel: '系统管理',
        icon: 'el-icon-setting',
        children: [
          {
            routeName: 'router-setting',
            routeLabel: '路由设置'
          }
        ]
      }
    ]
  }),

  methods: {
    // 获得人员菜单信息
    async fetchMenus() {
      // 默认从缓存中获取
      const menus = sessionCache.get('menus')
      if (menus) return (this.menus = menus)

      // 缓存没有menus则请求接口
      const res = await getMenus()
      if (res.code !== 'success') return

      // menu存入缓存并生成路由名称对应激活标识的映射表
      sessionCache.set('menus', res.content)
      this.menus = res.content
      this.mapActive(res.content)
    },

    // menuitem原生点击事件， 用来做路由跳转
    onMenuItemNativeClick(route) {
      route !== this.$route.name && this.$router.push({ name: route })
    },

    // 映射
    mapActive(menus) {
      let ret = {}

      function recursive(menus, parentName = '') {
        menus.forEach(({ children, routeName, routeLabel }) => {
          if (children && children.length) {
            recursive(children, routeName)
          } else {
            ret[routeName] = {
              parentName,
              routeName,
              routeLabel
            }
          }
        })
      }

      recursive(this.menus)

      sessionCache.set('activeMap', ret)
    }
  },

  computed: {
    // 默认展开的菜单
    defaultActive() {
      const { meta, name } = this.$route

      // 获取路由映射的参数
      const activeMap = sessionCache.get('activeMap')
      if (!activeMap) return ''

      // 当前激活的路由的归属
      const activeRoute = activeMap[meta.parent ? meta.parent : name]
      return activeRoute.parentName
        ? activeRoute.parentName + '/' + activeRoute.routeName
        : activeRoute.routeName
    }
  },

  mounted() {
    this.mapActive()
    // this.fetchMenus()
  }
}
</script>

<style lang="scss" scoped>
@import './var.scss';
.logo {
  height: $header-height;
  text-align: center;
  line-height: $header-height;
  font-size: 32px;
  font-weight: bold;
  background-color: $theme-color;
  box-shadow: 0 0 1px $theme-color;
  color: #ffffff;
  @include nowrap;
  padding: 0;
  position: relative;
  z-index: 1;
}

img {
  width: 100%;
  height: 100%;
}

.menus {
  height: calc(100% - #{$header-height});
  background-color: #42475a;
}
</style>


