import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { localCache } from '@/cache'

Vue.use(VueI18n)

export default new VueI18n({
  locale: localCache.get('lang') || 'zh',
  silentFallbackWarn: true,
  messages: {
    zh: {
      cancel: '取消',
      confirm: '确定',
      query: '查询',
      add: '新增',
      delete: '删除',
      edit: '编辑',
      reset: '重置',
      operate: '操作',
      warning: '警告',
      isDelete: '确定删除?',
      pleaseInput: '请输入!'
    },
    en: {
      cancel: 'cancel',
      confirm: 'confirm',
      query: 'query',
      add: 'add',
      delete: 'delete',
      edit: 'edit',
      reset: 'reset',
      operate: 'operate',
      warning: 'Warning',
      isDelete: 'Are you sure to delete?',
      pleaseInput: 'Please input!'
    }
  }
})
