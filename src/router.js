import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('./views/layout'),
      children: [
        { name: 'table', path: 'table', alias: '/', component: () => import('./examples/Table') },
        { name: 'chart', path: 'chart', component: () => import('./examples/Chart') }
      ]
    }
  ]
})
