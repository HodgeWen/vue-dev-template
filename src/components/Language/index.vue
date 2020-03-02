<template>
  <el-dropdown class="v-language" trigger="click" @command="onCommand">
    <span class="v-language__link">
      <span class="v-language__msg">{{msg}}</span>
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
