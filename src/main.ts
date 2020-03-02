import Vue from 'vue'
import router from './router'
import store from './store'
import components from 'components/index'

import plugins from 'utils/plugins'
Vue.config.productionTip = false

Vue.use(plugins)
// Vue.use(components)

new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app')
