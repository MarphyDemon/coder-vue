import Vue from "vue";
import Router from "vue-router";
import index from "@/views/index";
import login from "@/views/login";
import store from "../../store/store";



// 页面刷新时，重新赋值token
if (sessionStorage.getItem("token")) {
  store.commit("set_token", sessionStorage.getItem("token"));
}

const routes= [
  {
    path: "/",
    name: "index",
    component: index
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
]

const router = new Router({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

Vue.use(Router);

export default new Router({
  routes
});
