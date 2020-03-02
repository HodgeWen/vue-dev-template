<template>
  <div class="setting-drawer" :class="{ on: drawerOn }">
    <div class="setting-button" @click="onToggle"></div>
    <el-scrollbar class="setting-content">
      <p class="title">系统配置 <el-button type="text" size="mini" @click="onReset">重置为默认</el-button></p>
      <ul class="items">
        <li>
          <div>主题色</div>
          <v-color-picker
            v-if="drawerOn"
            :value="systemConfig.themeColor"
            @change="onConfigChange('themeColor', $event)"
          />
        </li>
        <li>
          <div>标签页</div>
          <el-switch :value="systemConfig.useTags" @change="onConfigChange('useTags', $event)" />
        </li>
        <li>
          <div>面包屑导航</div>
          <el-switch :value="systemConfig.useBreadcrumb" @change="onConfigChange('useBreadcrumb', $event)" />
        </li>
        <!-- <li>
          <div>
            国际化
            <el-tooltip effect="dark" content="需要后端支持" placement="left-end">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
          <el-switch :value="systemConfig.useI18n" @change="onConfigChange('useI18n', $event)" />
        </li> -->
        <li>
          <div>登录欢迎</div>
          <el-switch
            :value="systemConfig.useLoginWelcome"
            @change="onConfigChange('useLoginWelcome', $event)"
          />
        </li>
        <li>
          <div>
            菜单栏过渡
            <el-tooltip effect="dark" content="在数据较多的表格页面,开启过度会使页面卡顿" placement="left-end">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
          <el-switch
            :value="systemConfig.useToggleTransition"
            @change="onConfigChange('useToggleTransition', $event)"
          />
        </li>
        <li>
          <div>
            元素尺寸
            <el-tooltip effect="dark" content="刷新后生效" placement="left-end">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
          <v-select size="mini" style="width: 80px" :options="$data._sizeOptions" :value="systemConfig.size" @change="onConfigChange('size', $event)" />
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { Switch } from 'element-ui'
import { localCache } from '@/cache'

export default {
  components: {
    'el-switch': Switch
  },

  props: {
    drawerOn: Boolean
  },

  data: () => ({

    _sizeOptions: {
      large: '默认',
      medium: '中等',
      small: '小',
      mini: '超小'
    }
  }),

  computed: {
    systemConfig() {
      return this.$store.state.systemConfig
    }
  },

  methods: {
    // 打开/关闭设置栏
    onToggle() {
      this.$emit('change', !this.drawerOn)
    },

    // 设置系统配置
    setSystemConfig(payload) {
      const { $store } = this
      if (payload) {
        $store.commit('setSystemConfig', payload)
        localCache.set('system-config', payload)
        return
      }
      $store.commit('setSystemConfig', localCache.get('system-config') || {})
    },

    // 系统设置更改
    onConfigChange(key, value) {
      this.setSystemConfig({
        ...this.systemConfig,
        [key]: value
      })
    },

    onReset() {
      localCache.clear()
      location.reload()
    }
  },

  model: {
    event: 'change',
    prop: 'drawerOn'
  },

  mounted() {
    this.setSystemConfig()
  }
}
</script>

<style scoped lang="scss">
$width: 240px;
.setting-drawer {
  height: 100%;
  position: fixed;
  left: -$width;
  width: $width;
  transition: transform 0.3s;
  transition-timing-function: cubic-bezier(1, 0, 0, 1.2);
  z-index: 1000;
  &:hover {
    .setting-button {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

.setting-content {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  padding: 20px 0;

  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: visible;
    }

    .el-scrollbar__view {
      padding: 0 20px;
    }
  }
}

.setting-button {
  $size: 48px;
  position: absolute;
  z-index: -20;
  top: 30%;
  transform: translateX(-24px);
  right: -$size;
  width: $size;
  height: $size;
  border-radius: 0 24px 24px 0;
  background: #333;
  cursor: pointer;
  padding: 10px;
  transition: opacity 0.8s, transform 0.4s;
  opacity: 0.2;

  &:hover {
    opacity: 1;
    transform: translateX(0);
  }

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid #fff;
  }
}

.on {
  transform: translateX(#{$width});
}

.title {
  color: #666;
  font-size: 18px;
  margin-bottom: 10px;
}

.items {
  li {
    padding: 12px 0;
    font-size: 14px;
    color: #333;
    @include flex(space-between, center);
  }
}
</style>