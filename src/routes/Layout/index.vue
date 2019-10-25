<template>
  <div class="container" :class="{folded: isCollapse}">
    <!-- 侧边栏 start -->
    <SideBar class="aside" :collapse="isCollapse" />
    <!-- 侧边栏 end -->

    <!-- 内容区 start -->
    <div class="main">
      <HeaderBar class="header" :collapse="isCollapse" @toggle="isCollapse = !isCollapse" />

      <!-- 主视图 start -->
      <main class="page">
        <transition name="fade-transform" mode="out-in">
          <RouterView class="view" />
        </transition>
      </main>
      <!-- 主视图 start -->
    </div>
    <!-- 内容区 end -->
  </div>
</template>

<script>
import SideBar from './side-bar'
import HeaderBar from './header-bar'
import { getUserInfo } from 'apis/index'
import { sessionCache } from '@/cache'
export default {
  components: {
    SideBar,
    HeaderBar
  },

  data: () => ({
    isCollapse: false
  }),

  methods: {
    // 获取用户信息
    async fetchUserInfo() {
      // 先从回话缓存里获取用户信息，如有则不用再次请求
      const userInfo = sessionCache.get('userInfo')
      if (userInfo) return this.$store.commit('setUserInfo', userInfo)

      const res = await getUserInfo()
      if (res.code !== 'success') return

      // 存入缓存不需要每次都获取
      sessionCache.set('userInfo', res.content)
      this.$store.commit('setUserInfo', res.content)
    }
  },

  mounted() {
    // 获取人员信息
    this.fetchUserInfo()
  }
}
</script>

<style lang="scss" scoped>
$bar-width: 217px;
.aside::v-deep {
  width: $bar-width;
  height: 100%;
  float: left;

  .el-menu {
    border-right: none;
    user-select: none;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.container {
  height: 100vh;
  @include clear;
}

.folded {
  .aside {
    width: 64px;
  }
  .main {
    width: calc(100% - 64px);
  }
}

.main {
  width: calc(100% - #{$bar-width});
  height: 100%;
  float: left;
  background-color: #eef7f4;
}

.aside,
.main {
  transition: width 0.2s;
}

.tags {
  height: 24px;
  padding: 0 10px;
  background-color: #ffffff;
  @include flex(flex-start, center);
}

.page {
  padding: 12px 8px;
  height: calc(100% - #{$header-height});
  width: 100%;
  overflow-x: hidden;
}
</style>