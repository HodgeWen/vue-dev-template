import { Cache } from 'wts-utils'

export const localCache = Cache.create('localStorage')

export const sessionCache = Cache.create('sessionStorage')

/* 初始化本地缓存 start */

// 系统配置初始化
!localCache.get('system-config') && localCache.set('system-config', {
  themeColor: '#418b7b',                                                    // 主题色
  useTags: true,                                                            // 是否启用标签页
  useBreadcrumb: true,                                                      // 是否启用面包屑导航
  size: document.body.offsetWidth > 1800 ? 'large' : 'small',               // 尺寸
  useLoginWelcome: true,                                                    // 是否启用登录欢迎
  useToggleTransition: false                                                // 是否开启过渡动画
})

/* 初始化本地缓存 end */

/* 初始化会话缓存 start */


/* 初始化会话缓存 end */