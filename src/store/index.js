import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
 
export default new Vuex.Store({
  state: {
      user: {},
      token: null,
      title: ''
  },
  mutations: {
      [types.LOGIN]: (state, data) => {
          localStorage.token = data;
          state.token = data;
      },
      [types.LOGOUT]: (state) => {
          localStorage.removeItem('token');
          state.token = null
      },
      [types.TITLE]: (state, data) => {
          state.title = data;
      }
  }
})