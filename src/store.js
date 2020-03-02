import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},             // 用户信息

    systemConfig: {},         // 系统配置

    breadcrumbs: [],          // 面包屑

    route: {}
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },

    setSystemConfig(state, payload) {
      state.systemConfig = payload
    },

    setBreadcrumbs(state, payload) {
      state.breadcrumbs = payload
    },

    setRoute(state, route) {
      state.route = route
    }
  }
})
