import Vue from 'vue'
import router from './router'
import store from './store'
import components from 'components' // 此处引入自定义组件
import 'utils/date'
// import 'style/normalize.less'
// import 'style/iview-overwrite.less'
import Print from 'utils/print'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(components) // 此处将自定义组件注册为全局组件[如需取消全局注册自定义组件请删除当前行以及第4行]
Vue.use(Print)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h('router-view')
}).$mount('#app')
