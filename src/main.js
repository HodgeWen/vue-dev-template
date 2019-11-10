import Vue from 'vue'
import router from './routes'
import store from './store'
import plugins from './utils/plugins'
import components from 'components/index'
import i18n from 'i18n/index'

Vue.config.productionTip = false

Vue.use(plugins)
Vue.use(components)

new Vue({
  router,
  store,
  i18n,
  render: h => h('router-view')
}).$mount('#app')
