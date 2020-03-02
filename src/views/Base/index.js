export default [
  {
    name: 'dicts',
    path: 'base/dicts',
    component: () => import('./Dicts/index.vue'),
    meta: { title: '数据字典管理', pre: [['基础资料']] }
  }
]
