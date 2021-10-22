import { createStore } from 'vuex'

export default createStore({
  state: {
    //用户信息
    userInfo:{},
    addLink:0   //用来监听是否添加友链
  },
  mutations: {
    //修改state里的数据
    updateUserInfo(state, userInfo){
      state.userInfo = userInfo; //将用户数据更新到state.userInfo
    },
    //清空userInfo
    clearUserInfo(state){
      state.userInfo = {};
    },
    //每新增1条友链时，都改变addLink值
    noticeAddLink(state){
      state.addLink++;
    }
  },
  actions: {
  },
  modules: {
  }
})
