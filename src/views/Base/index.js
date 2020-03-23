export default [
  {
    name: 'accounts',
    path: 'base/accounts',
    component: () => import('./Account'),
    meta: { title: '账户管理', pre: [['基础']] }
  },
  {
    name: 'accounts-create',
    path: 'base/accounts/create',
    component: () => import('./Account/form'),
    meta: { title: '添加账户', pre: [['基础'], ['账户管理', 'accounts']] }
  },

  {
    name: 'poster',
    path: 'base/poster',
    component: () => import('./Poster'),
    meta: { title: '海报', pre: [['基础']] }
  },

  {
    name: 'activity',
    path: 'base/activity',
    component: () => import('./Activity'),
    meta: { title: '活动', pre: [['基础']] }
  },
]
