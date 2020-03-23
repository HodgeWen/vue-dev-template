<template>
  <div class="container" :class="{folded: isCollapse}">
    <!-- 侧边栏 start -->
    <SideBar class="aside" :class="{'on-transition': systemConfig.useToggleTransition}" :collapse="isCollapse" />
    <!-- 侧边栏 end -->

    <!-- 内容区 start -->
    <div class="main" :class="{'on-transition': systemConfig.useToggleTransition, 'with-tags': systemConfig.useTags }">
      <!-- 头 start -->
      <HeaderBar :collapse="isCollapse" @toggle="isCollapse = !isCollapse" />
      <!-- 头 end -->

      <!-- 标签页 start -->
      <RouterTag v-if="systemConfig.useTags" />
      <!-- 标签页 end -->

      <!-- 主视图 start -->
      <main class="page">
        <transition name="fade-transform" mode="out-in"><RouterView /></transition>
      </main>
      <!-- 主视图 start -->
    </div>
    <!-- 内容区 end -->

    <!-- 设置 start -->
    <Setting v-model="settingShow" />
    <!-- 设置 end -->

    <!-- mask start -->
    <transition name="fade" mode="out-in">
      <div v-if="settingShow" class="mask" @click="settingShow = false"></div>
    </transition>
    <!-- mask end -->
  </div>
</template>

<script>
import SideBar from './Aside/side-bar'
import HeaderBar from './Header/header'
import Setting from './setting'
import {  } from 'apis/index'
import { sessionCache } from '@/cache'
import { mapState } from 'vuex'
import RouterTag from './tag'
export default {
  components: {
    SideBar,
    HeaderBar,
    Setting,
    RouterTag
  },

  data: () => ({
    isCollapse: false,

    settingShow: false
  }),

  computed: mapState([
    'systemConfig', 'userInfo'
  ]),

  methods: {
    commitUserInfo() {
      this.$store.commit('setUserInfo', sessionCache.get('userInfo'))
    },

    welcome() {
      if (!this.systemConfig.useLoginWelcome) return
      const welcomed = sessionCache.get('welcomed')
      if (welcomed === true) return
      sessionCache.set('welcomed', true)
      this.$notify({
        title: `欢迎, ${this.userInfo.name}`
      })
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        if (!newVal.meta.title) return
        let title = document.getElementsByTagName('title')[0]
        if (title) {
          title.innerText = newVal.meta.title
        } else {
          title = document.createElement('title')
          title.innerText = newVal.meta.title
          document.head.appendChild(title)
        }
      }
    }
  },

  mounted() {
    this.commitUserInfo() // 用户信息
    this.welcome()        // 登录欢迎
    // getDicts()            // 数据字典
  }
}
</script>

<style lang="scss" scoped>
@import './var.scss';
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
  min-width: 1100px;
  position: relative;
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
  background-color: #f5f5f5;
}

.on-transition {
  transition: width 0.2s;
}

.page {
  padding: 10px;
  height: calc(100% - #{$header-height});
  width: 100%;
  overflow-x: hidden;
}

.with-tags {
  .page {
    height: calc(100% - #{$header-height} - #{$tags-height});
  }
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, .5);
  cursor: pointer;
  z-index: 500;
}
</style>