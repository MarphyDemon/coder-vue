import Vue from "vue";
import Router from "vue-router";
import store from "../../store/store";

import index from "@/views/index";
import login from "@/views/login";
import question from "@/views/question";
import rankingList from "@/views/rankingList";
import about from "@/views/about";
import study from "@/views/study";
import challenge from "@/views/challenge";
import devote from "@/views/devote";

// 页面刷新时，重新赋值token
if (sessionStorage.getItem("token")) {
  store.commit("set_token", sessionStorage.getItem("token"));
}
if (sessionStorage.getItem("username")) {
  store.commit("set_username", sessionStorage.getItem("username"));
}

const routes= [
  {
    path: "/",
    component: challenge,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
  {
    path: "/index",
    component: index,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/question",
    name: "question",
    component: question,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
  {
    path: "/rankingList",
    name: "rankingList",
    component: rankingList,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
  {
    path: "/about",
    name: "about",
    component: about,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
  {
    path: "/study",
    name: "study",
    component: study,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
  {
    path: "/challenge",
    name: "challenge",
    component: challenge,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
  ,
  {
    path: "/devote",
    name: "devote",
    component: devote,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
     },
  },
]


Vue.use(Router);
export default new Router({
  mode: 'history',
  base: "/",
  routes
});
