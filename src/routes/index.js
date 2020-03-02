import Vue from 'vue'
import Router from 'vue-router'
import { sessionCache } from '@/cache'
import Base from 'views/Base'               // 基础信息
Vue.use(Router)

// 每个一级菜单形成一个路由. 每个一级路由下
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../layout/index.vue'),
      children: [
        ...Base
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./Login/index.vue')
    },
    {
      path: '/lock',
      name: 'lock',
      component: () => import('./Lock/index.vue')
    },
    { path: '/401', name: '401', component: () => import('./Error/401.vue') },
    { path: '/404', name: '404', component: () => import('./Error/404.vue') },
    { path: '*', redirect: '/404' }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 除了登录页之外的所有页面都需要token, 否则返回登录页
  if (to.name !== 'login' && !sessionCache.get('token')) {
    return next({ name: 'login' })
  }

  // 锁定的页面不能进入任何其他页面
  if (to.name !== 'lock' && sessionCache.get('lock-info')) {
    return next({ name: 'lock', replace: true })
  }

  // 通过
  next()
})

export default router
