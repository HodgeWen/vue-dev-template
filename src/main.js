import Vue from 'vue'
import router from './router'
import store from './store'
import components from 'components'
import 'utils/date'
import 'style/normalize.less'
import 'style/iview-overwrite.less'

Vue.use(components)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app')
