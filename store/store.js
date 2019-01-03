import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    username: ""
  },
  mutations: {
    set_token(state, token) {
      state.token = token;
      sessionStorage.token = token;
    },
    del_token(state) {
      state.token = "";
      sessionStorage.removeItem("token");
    },
    set_username(state, username) {
      state.username = username;
      sessionStorage.username = username;
    },
    del_username(state) {
      state.username = "";
      sessionStorage.removeItem("username");
    }
  }
});
