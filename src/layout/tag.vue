<template>
  <div class="v-router-tag">
    <div class="v-router-tag__pre" @click="onScrollTo('left')">
      <i class="el-icon-caret-left"></i>
    </div>
    <ul class="v-router-tag__wrap" ref="wrap" @mousewheel.prevent="onMousewheel" @mouseenter="onMouseEnter">
      <li
        v-for="(item, index) of routes"
        class="v-router-tag__item"
        :class="$route.name === item.name && 'v-router-tag__item--active'"
        :key="item.name"
        :ref="$route.name === item.name ? 'tag' : null"
        @click="onClick(item, $event)"
      >
        <i class="el-icon-paperclip"></i>
        <span>{{item.label}}</span>
        <i class="el-icon-close" v-if="routes.length > 1" @click.stop="onTagClose(item, index)"></i>
      </li>
    </ul>
    <div class="v-router-tag__next" @click="onScrollTo('right')">
      <i class="el-icon-caret-right"></i>
    </div>
    <div class="v-router-tag__close" @click="onCloseAll">
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
import { setScrollAnimation } from 'utils/animation'
export default {
  name: 'VRouterTag',

  data: () => ({
    routes: [], // 路由列表

    didTagWrapIsOverflow: false
  }),

  methods: {
    onTagClose(item, index) {
      let { name } = this.$route

      let lastIndex = this.routes.length - 1
      this.routes.splice(index, 1)
      // 如果删除的是当前页则跳转到其他页面
      if (item.name === name) {
        let nextIndex = index === lastIndex ? index - 1 : index
        this.$router.push({ name: this.routes[nextIndex].name })
      }
    },

    onClick({ name, params }, e) {
      name !== this.$route.name && this.$router.push({ name, params })
    },

    onMousewheel(e) {
      if (!this.didTagWrapIsOverflow) return
      let { wrap } = this.$refs
      wrap.scrollLeft += e.deltaY / 3
    },

    onMouseEnter() {
      this.getIfOverflow()
    },

    onCloseAll() {
      this.routes = this.routes.slice(0, 1)
      let name = this.routes[0].name
      name !== this.$route.name && this.$router.push({ name })
    },

    // 检测tag是否溢出容器
    getIfOverflow() {
      let { wrap } = this.$refs
      if (!wrap) return
      this.didTagWrapIsOverflow = wrap.scrollWidth > wrap.offsetWidth
    },

    // 页面发生跳转时
    onRouteChange({ name, meta, params }, oldRoute) {
      let route = { name, label: meta.title, params }
      let { routes } = this

      // 如果tag数组中没有此tag则推入此页面的路由
      if (routes.findIndex(item => item.name === name) === -1) {
        routes.push(route)
      }

      // 如果上个路由和当前路由的名称不一致且上个呗销毁的路由有参数则销毁
      if (oldRoute && oldRoute.name !== name && !this.$isEmpty(oldRoute.params)) {
        let oldIndex = routes.findIndex(item => item.name === oldRoute.name)
        oldIndex !== -1 && routes.splice(oldIndex, 1)
      }
    },

    onScrollTo(direction) {
      let { wrap } = this.$refs

      // 减少layout带来的性能损耗
      if (!this.didTagWrapIsOverflow) return
      
      let currentDistance = wrap.scrollLeft                                                                       // 当前值
      let totalWidth = wrap.scrollWidth                                                                           // 移动上限
      let containerWidth = wrap.offsetWidth                                                                       // 容器宽度
      let restDistance = direction === 'right' ? totalWidth - containerWidth - currentDistance : currentDistance  // 剩余距离
      let distance = restDistance < containerWidth ? restDistance : containerWidth                                // 需移动的距离
      
      if (direction === 'right') {
        if (currentDistance + containerWidth >= totalWidth) return
        setScrollAnimation(wrap, 'scrollLeft', distance, 500)
      } else if (direction === 'left') {
        if (currentDistance === 0) return
        setScrollAnimation(wrap, 'scrollLeft', -distance, 500)
      }
    }
  },

  watch: {
    $route: {
      handler(route, oldRoute) {
        this.onRouteChange(route, oldRoute)
        this.getIfOverflow()
        this.$nextTick(() => this.$refs.tag[0].scrollIntoView())
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
$button-size: 26px;

.v-router-tag {
  overflow: hidden;
  padding: 0 10px;
  background: #fff;
  font-size: 0;

  &__pre, &__next, &__close {
    font-size: 14px;
    display: inline-block;
    height: $button-size;
    width: $button-size;
    line-height: $button-size;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #999;
    color: #999;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      border: 1px solid $primary-color;
      color: $primary-color;
    }
  }

  &__next {
    margin-right: 8px;
  }

  &__wrap {
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    font-size: 0;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    margin: 0 8px;
    user-select: none;
    width: calc(100% - 24px - #{$button-size * 3});
  }
  

  &__item {
    vertical-align: middle;
    cursor: pointer;
    line-height: 26px;
    transition: all .3s;
    padding: 0 14px;
    display: inline-block;
    font-size: 14px;
    background: #F0F0F0;
    border-radius: 4px;
    color: #999;
    border: 1px solid #E6E6E6;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover {
      color: $primary-color;
      
      .el-icon-close {
        width: 12px;
      }
    }

    .el-icon-close {
      font-size: 12px;
      width: 0;
      transition: width .3s, background-color .3s;
      overflow: hidden;
      vertical-align: middle;
      margin-left: 3px;
      border-radius: 50%;

      &:hover {
        background: #bbb;
      }
    }


    &--active {
      color: $primary-color;
      background: #fff;
      .el-icon-close {
        width: 12px;
      }
    }
  }
}
</style>
