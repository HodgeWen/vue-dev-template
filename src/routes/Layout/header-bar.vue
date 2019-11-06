<template>
  <header class="header">
    <section>
      <VIcon pointer size="24px" @click="$emit('toggle')" :type="collapse ? 's-unfold' : 's-fold'" />
      <!-- <strong>&nbsp;&nbsp;客户关系云平台</strong> -->
      <Breadcrumb class="breadcrumb" separator=">">
        <!-- layout后期要换成首页的路由名称 -->
        <!-- <BreadcrumbItem
          v-for="({ name, title }, index) of breadcrumbs"
          :to="breadcrumbs.length - 1 !== index ? { name } : null"
          :key="index"
        >{{title}}</BreadcrumbItem> -->
      </Breadcrumb>
    </section>

    <section>
      <!-- 语言 -->
      <!-- <Language class="margin-right" /> -->

      <ColorPicker />

      <!-- 头像 -->
      <Avatar style="margin-right: 4px" size="small">{{(userInfo.userName || '').slice(0, 1)}}</Avatar>
      <span style="font-size: 14px" class="margin-right">{{userInfo.userName || '用户名'}}</span>

      <!-- 登出 -->
      <confirm-popover tips="确定退出登录?" @confirm="onLogout">
        <v-icon pointer size="20px" type="switch-button" />
      </confirm-popover>
    </section>
  </header>
</template>

<script>
import { Avatar, Breadcrumb, BreadcrumbItem } from 'element-ui'
import { logout } from 'apis/index'
import { sessionCache } from '@/cache'
import i18n from './i18n'
import { Language, ColorPicker } from 'components/index'

export default {
  components: {
    Avatar,
    Language,
    Breadcrumb,
    BreadcrumbItem,
    ColorPicker
  },

  i18n,

  props: {
    collapse: Boolean
  },

  data: vm => ({
    colors: ''
  }),

  computed: {
    // 用户信息
    userInfo() {
      return this.$store.state.userInfo
    },

    // 面包屑
    breadcrumbs() {
      const { meta, name } = this.$route
      const activeMap = sessionCache.get('activeMap')
      const menus = sessionCache.get('menus') || []

      let ret = [{ title: '首页', name: 'layout' }]

      if (!activeMap || !menus || name === 'layout') return ret

      // const parentName = activeMap[name].parentName
      // if (parentName) {
      //   ret.push({ title: activeMap[parentName].routeLabel })
      // }

      ret.push({ title: activeMap[name].routeLabel, name: activeMap[name].routeName})

      return ret
    }
  },

  methods: {
    // 退出登录
    async onLogout() {
      // const res = await onLogout()
      // if (res.code !== 'success') return
      sessionCache.clear()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './var.scss';
.header {
  height: $header-height;
  padding: 0 16px;
  background-color: $theme-color;
  box-shadow: 0 0 1px $theme-color;
  @include flex(space-between, center);

  section {
    color: #ffffff;
    @include flex(flex-start, center);
    & > * {
      vertical-align: middle;
    }
  }
}

strong {
  color: #ffffff;
  font-size: 22px;
}

.margin-right {
  margin-right: 10px;
  color: #ffffff;
}

.breadcrumb::v-deep {
  margin-left: 12px;
  .el-breadcrumb__inner {
    color: #ffffff;
    &:hover {
      color: inherit;
    }
  }
}
</style>