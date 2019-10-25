export default [
  {
    name: 'router-setting',
    path: 'system/router',
    component: () => import('./RoutesSetting/index.vue'),
    meta: { title: '路由设置' }
  },
  {
    name: 'router-child',
    path: 'system/router/child',
    component: () => import('./RoutesSetting/child.vue'),
    meta: { title: '路由设置子页面', parent: 'router-setting' }  // 表示这个页面的上个页面为router-setting页面
  }
]
