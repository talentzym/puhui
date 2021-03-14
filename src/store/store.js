import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    register_phone: '',
    msgCenterIndex: 0,
    noticeListscroll: 0,
    lendListScrollHeight: [0, 0, 0, 0, 0],
    lendListIndex: 2
  },
  getters: {
    register_phone: state => state.register_phone,
    msgCenterIndex: state => state.msgCenterIndex,
    noticeListscroll: state => state.noticeListscroll,
    lendListScrollHeight: state => state.lendListScrollHeight,
    lendListIndex: state => state.lendListIndex
  },
  mutations: {},
  actions: {}
})
