<template>
  <div class="setting-drawer" :class="{ on: drawerOn }">
    <div class="setting-button" @click="onToggle"></div>
    <div class="setting-content">
      <p class="title">系统配置</p>
      <ul class="items">
        <li>
          <div>主题色</div>
          <ColorPicker :value="systemConfig.color" @change="onConfigChange('color', $event)" />
        </li>
        <li>
          <div>启用标签页</div>
          <el-switch :value="systemConfig.useTags" @change="onConfigChange('useTags', $event)"/>
        </li>
        <li>
          <div>启用面包屑</div>
          <el-switch :value="systemConfig.useThumb" @change="onConfigChange('useThumb', $event)"/>
        </li>
        <li>
          <div>
            启用国际化
            <el-tooltip effect="dark" content="需要后端支持" placement="left-end">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
          <el-switch :value="systemConfig.useI18n" @change="onConfigChange('useI18n', $event)"/>
        </li>
        <li>
          <div>启用登录欢迎</div>
          <el-switch :value="systemConfig.useLoginWelcome" @change="onConfigChange('useLoginWelcome', $event)"/>
        </li>
        <li>
          <div>
            启用菜单栏过渡
            <el-tooltip effect="dark" content="在数据较多的表格页面,开启过度会使页面卡顿" placement="left-end">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
          <el-switch :value="systemConfig.useToggleTransition" @change="onConfigChange('useToggleTransition', $event)"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Switch } from 'element-ui'
import { ColorPicker } from 'components/index'
import { localCache } from '@/cache'

export default {
  components: {
    'el-switch': Switch,
    ColorPicker
  },

  data: () => ({
    drawerOn: false
  }),

  computed: {
    systemConfig() {
      return this.$store.state.systemConfig
    }
  },

  methods: {
    // 打开/关闭设置栏
    onToggle() {
      this.drawerOn = !this.drawerOn
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
    }
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
  right: -$width;
  width: $width;
  transition: transform 0.3s;
  z-index: 10;
  &:hover {
    .setting-button {
      opacity: 1;
      transform: translate(0, -50%);
    }
  }
}

.setting-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #f2f2f2;
  padding: 20px;
}

.setting-button {
  $size: 48px;
  position: absolute;
  z-index: -100;
  top: 50%;
  transform: translate(24px, -50%);
  left: -$size;
  width: $size;
  height: $size;
  border-radius: 24px 0 0 24px;
  background: #666;
  cursor: pointer;
  padding: 10px;
  transition: opacity 0.8s, transform 0.4s;
  opacity: 0.2;

  &:hover {
    opacity: 1;
    transform: translate(0, -50%);
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
  transform: translateX(-#{$width});
}

.title {
  color: #666;
  font-size: 18px;
  margin-bottom: 10px;
}

.items {
  li {
    height: 30px;
    font-size: 14px;
    color: #333;
    @include flex(space-between, center);
  }
}
</style>