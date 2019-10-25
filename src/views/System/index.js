export default [
  {
    name: 'routesSetting',
    path: 'system/router',
    component: () => import('./RoutesSetting/index.vue'),
    meta: { title: '路由设置' }
  }
]
