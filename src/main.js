// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Axios from 'axios';
import Vuex from 'vuex'
import store from '../store/store'

Vue.config.productionTip = false;

import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(elementUI);

Axios.defaults.headers.common["Authorization"] = "Bearer "+store.state.token;


// import * as Highcharts from "highcharts";
// 加载导出模块
// import * as Exporting from "highcharts/modules/exporting";
// // 初始化导出模块
// Exporting(Highcharts);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
