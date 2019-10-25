import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}, // 用户信息
    tags: [], // 页面路由缓存
    tagsIndex: {} // 路由索引
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload
    },

    addTags({ tags, tagsIndex }, route) {
      const { meta, name } = route
      meta.title && name && !tagsIndex[name] && (
        tagsIndex[name] = true,
        tags.push(route)
      )     
    },

    deleteTags({ tags, tagsIndex }, index) {
      delete tagsIndex[tags[index].name]
      tags.splice(index, 1)
    }
  }
})
