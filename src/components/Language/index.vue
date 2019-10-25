<template>
  <el-dropdown class="v-language" trigger="click" @command="onCommand">
    <span class="link">
      <span class="msg">{{msg}}</span>
      <i class="el-icon-caret-bottom"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :command="key" v-for="(val, key) in lang" :key="key">{{val}}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import i18n from 'i18n/index'
import { localCache } from '@/cache'

export default {
  name: 'VLanguage',

  data: vm => ({
    msg: '中文'
  }),

  props: {
    lang: {
      type: Object,
      default: () => ({
        zh: '中文',
        en: 'English'
      })
    }
  },

  methods: {
    onCommand (cmd) {
      i18n.locale = cmd
      localCache.set('lang', cmd)
      this.msg = this.lang[cmd]
    }
  },

  mounted () {
    this.msg = this.lang[localCache.get('lang') || 'zh']
  }
}
</script>

<style lang="scss" scoped>
.v-language {
  width: 70px;
}

.link {
  cursor: pointer;
  @include flex(space-between, center);
}

.msg {
  width: 56px;
  text-align: right;
  @include nowrap;
}
</style>