import Vue from 'vue'
import Router from 'vue-router'
import { sessionCache } from '@/cache'
import System from 'views/System'

Vue.use(Router)

// 每个一级菜单形成一个路由. 每个一级路由下
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', name: '404', component: () => import('./Error/404.vue') },
    { path: '/401', name: '401', component: () => import('./Error/401.vue') },
    {
      path: '/',
      name: 'layout',
      component: () => import('./Layout/index.vue'),
      children: [
        ...System
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./Login/index.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 除了登录页之外的所有页面都需要token, 否则返回登录页
  if (to.name !== 'login' && !sessionCache.get('token')) {
    return next({ name: 'login' })
  }

  // 通过
  next()
})

export default router