// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from 'axios';
import store from '../store/store'

Vue.config.productionTip = false;

import elementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(elementUI);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.state.token = "";
          sessionStorage.removeItem("token");
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
          });
      }
    }
    return Promise.reject(error.response.data);
  }
);

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    } else {
      next({
        path: "/login",
        // query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
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
