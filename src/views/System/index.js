export default [
  {
    name: 'router-setting',
    path: 'system/router',
    component: () => import('./RoutesSetting/index.vue'),
    meta: { title: '路由设置' }
  }
]
