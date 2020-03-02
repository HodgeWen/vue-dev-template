<template>
  <header class="header" :style="{ backgroundColor: '#fff' || systemConfig.themeColor }">
    <section class="header__left">
      <v-icon color="#595757" pointer size="16px" @click="$emit('toggle')" :type="collapse ? 'menu-fold' : 'menu-unfold'" />

      <Breadcrumb v-if="systemConfig.useBreadcrumb" />
    </section>

    <section class="header__right">
      <!-- 全屏切换 -->
      <v-fullscreen-switch />

      <!-- 锁屏 -->
      <LockSwitch />

      <!-- 登录操作 -->
      <el-dropdown @command="onDropMenuCommand" placement="bottom-start">
        <span class="user">
          <Avatar style="margin-right: 4px; vertical-align: middle" size="small">{{(userInfo.name || '').slice(0, 1)}}</Avatar>
          <span style="vertical-align: middle">{{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command='logout'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
  </header>
</template>

<script>
import { Avatar } from 'element-ui'
import LockSwitch from './header-lock'
import Breadcrumb from './header-breadcrumb'
import { sessionCache } from '@/cache'
export default {
  components: {
    Avatar,
    LockSwitch,
    Breadcrumb
  },

  props: {
    collapse: Boolean
  },

  data: vm => ({
    isInFullScreen: false
  }),

  computed: {
    // 用户信息
    userInfo() {
      return this.$store.state.userInfo || {}
    },

    systemConfig() {
      return this.$store.state.systemConfig || {}
    }
  },

  methods: {
    async logout() {
      sessionCache.clear()
      this.$router.replace({ name: 'login' })
    },

    onDropMenuCommand(methodName) {
      this[methodName] && this[methodName]()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../var.scss';
.header {
  height: $header-height;
  padding: 0 16px;
  background-color: $theme-color;
  box-shadow: 0 0 1px $theme-color;
  border-bottom: 1px solid #E3E4E6;
  @include flex(space-between, center);

  section {
    @include flex(flex-start, center);
    & > * {
      vertical-align: middle;
    }
  }

  &__right {
    & > * {
      margin-left: 10px;
    }
  }

  &__left {
    & > * {
      margin-right: 10px;
    }
  }
}

.user {
  cursor: pointer;
  display: inline-block;
}
</style>