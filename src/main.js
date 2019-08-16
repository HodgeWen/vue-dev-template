import Vue from 'vue'
import router from './router'
import store from './store'
import components from 'components'
import 'iview/dist/styles/iview.css' // iview样式
import 'utils/date'

Vue.use(components)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app')
